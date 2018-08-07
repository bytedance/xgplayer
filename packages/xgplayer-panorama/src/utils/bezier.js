const bezier = (() => {
  const kSplineTableSize = 11
  const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0)

  function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1 };
  function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1 };
  function C (aA1) { return 3.0 * aA1 };

  function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT };
  function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1) };

  function binarySubdivide (aX, aA, aB, mX1, mX2) {
    let currentX, currentT
    let i = 0
    do {
      currentT = aA + (aB - aA) / 2.0
      currentX = calcBezier(currentT, mX1, mX2) - aX
      if (currentX > 0.0) { aB = currentT } else { aA = currentT };
    } while (Math.abs(currentX) > 0.0000001 && ++i < 10)
    return currentT
  }

  function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, mX1, mX2)
      if (currentSlope === 0.0) return aGuessT
      const currentX = calcBezier(aGuessT, mX1, mX2) - aX
      aGuessT -= currentX / currentSlope
    }
    return aGuessT
  }

  function bezier (mX1, mY1, mX2, mY2) {
    if (!(mX1 >= 0 && mX1 <= 1 && mX2 >= 0 && mX2 <= 1)) return
    let sampleValues = new Float32Array(kSplineTableSize)

    if (mX1 !== mY1 || mX2 !== mY2) {
      for (let i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2)
      }
    }

    function getTForX (aX) {
      let intervalStart = 0.0
      let currentSample = 1
      const lastSample = kSplineTableSize - 1

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize
      }

      --currentSample

      const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample])
      const guessForT = intervalStart + dist * kSampleStepSize
      const initialSlope = getSlope(guessForT, mX1, mX2)

      if (initialSlope >= 0.001) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2)
      } else if (initialSlope === 0.0) {
        return guessForT
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2)
      }
    }

    return x => {
      if (mX1 === mY1 && mX2 === mY2) return x
      if (x === 0) return 0
      if (x === 1) return 1
      return calcBezier(getTForX(x), mY1, mY2)
    }
  }

  return bezier
})()

export default bezier
