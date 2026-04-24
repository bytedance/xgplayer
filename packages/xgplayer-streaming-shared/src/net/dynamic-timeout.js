function clamp(value, min, max) {
  if (typeof value !== 'number' || Number.isNaN(value)) return min
  return Math.min(max, Math.max(min, value))
}

export function getSharedDynamicTimeoutIns(dynamicTimeoutConfig) {
  if (!dynamicTimeoutConfig) return
  const cfg = dynamicTimeoutConfig

  if (!cfg || typeof cfg !== 'object') return

  const { algorithm, type, ...opts } = cfg
  if (type === 1) {
    return new EwmaTimeout(opts)
  } else {
    return new JacobsonKarelsTimeout(opts)
  }
}
/*
  EWMA_t = α * T + (1 - α) * EWMA_{t-1}
  其中，EWMA_t：当前时刻 t 的预测值, EWMA_{t-1}：上一时刻的预测值;
       T：当前时刻的采样值， α：平滑因子/权重系数，一般取值在[0.8, 0.9]；

  初始值： EWMA_0 = 第一次收集到采样值 T0
 */

export class EwmaTimeout {
  constructor(opts = {}) {
    const { alpha = 0.8, minTimeout = 0, maxTimeout = Infinity, initialTimeout } = opts

    this._alpha = alpha
    this._min = minTimeout
    this._max = maxTimeout
    this._initial = initialTimeout
    this._ewma = undefined
  }

  getTimeout(fallback = 0) {
    const value = this._ewma ?? this._initial ?? fallback
    return clamp(Math.round(value), this._min, this._max)
  }

  update(sample) {
    if (typeof sample !== 'number' || Number.isNaN(sample) || sample < 0)
      return this.getTimeout()
    const lastEwma = this._ewma || 3000
    this._ewma = this._alpha * sample + (1 - this._alpha) * lastEwma
    return this.getTimeout()
  }

  reset() {
    this._ewma = undefined
  }
}
/*
  1. 计算平滑值
      ST_t = α * T + (1 - α) * ST_{t-1}
           = ST_{t-1} + α * (T - ST_{t-1})
      这里的 α 通常取 0.125（1/8);
  2. 计算方差
      TVAR_t = (1 - β) * TVAR_{t-1} + β * |T - ST_{t-1}|
             = TVAR_{t-1} + β * (|T - ST_{t-1}| - TVAR_{t-1})
      β 通常取 0.25（1/4），平衡历史波动与当前偏差;
  3. 最终训练超时值
      => timeout = ST_t + K * TVAR_t
      K 通常取 4；

  初始值：
  ST_0 = 第一次收集到采样值T0
  TVAR_0 = 第一次收集到采样值T0 / 2
 */

export class JacobsonKarelsTimeout {
  constructor(opts = {}) {
    const {
      alpha = 0.125,
      beta = 0.25,
      k = 4,
      minTimeout = 0,
      maxTimeout = Infinity,
      initialTimeout
    } = opts

    this._alpha = alpha
    this._beta = beta
    this._k = k
    this._min = minTimeout
    this._max = maxTimeout
    this._initial = initialTimeout || 1000
    this._srtt = undefined
    this._rttvar = undefined
  }

  getTimeout(fallback = 0) {
    const timeout =
      this._srtt !== undefined && this._rttvar !== undefined
        ? this._srtt + this._k * this._rttvar
        : (fallback ?? this._initial)
    return clamp(Math.round(timeout), this._min, this._max)
  }

  update(sample) {
    if (typeof sample !== 'number' || Number.isNaN(sample) || sample < 0)
      return this.getTimeout()
    if (this._srtt === undefined || this._rttvar === undefined) {
      this._srtt = sample
      this._rttvar = sample / 2
      return this.getTimeout()
    }

    const prevSrtt = this._srtt
    this._srtt = prevSrtt + this._alpha * (sample - prevSrtt)
    this._rttvar =
      this._rttvar + this._beta * (Math.abs(sample - prevSrtt) - this._rttvar)
    return this.getTimeout()
  }

  reset() {
    this._srtt = undefined
    this._rttvar = undefined
  }
}
