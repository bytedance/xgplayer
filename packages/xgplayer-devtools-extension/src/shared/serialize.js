/**
 * Safe serialization helpers. Player/stream objects contain DOM nodes,
 * circular references and typed arrays that cannot cross postMessage cheaply,
 * so we trim them to plain, depth-limited structures before sending.
 */

const SIMPLE = [
  'Boolean',
  'Number',
  'String',
  'Undefined',
  'Null',
  'Date',
  'Object',
  'Array'
]

function typeOf(val) {
  return Object.prototype.toString.call(val).slice(8, -1)
}

/**
 * Depth-limited, cycle-safe plain-object projection.
 * @param {*} obj
 * @param {number} maxDepth
 */
export function trim(obj, maxDepth = 3, _depth = 1, _seen = new WeakSet()) {
  if (obj === null || typeof obj !== 'object') return obj

  const t = typeOf(obj)
  if (t === 'Array' && obj.length > 50 && _depth > 1) return `Array[${obj.length}]`
  if (!SIMPLE.includes(t)) {
    if (t.endsWith('Array') || t === 'ArrayBuffer')
      return `${t}[${obj.length ?? obj.byteLength ?? '?'}]`
    return t
  }
  if (_seen.has(obj)) return '[Circular]'
  if (_depth > maxDepth) return t === 'Array' ? `Array[${obj.length}]` : '{…}'
  _seen.add(obj)

  if (t === 'Array') {
    return obj.slice(0, 50).map((v) => trim(v, maxDepth, _depth + 1, _seen))
  }
  const out = {}
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue
    if (key.startsWith('_') && _depth > 1) continue
    try {
      out[key] = trim(obj[key], maxDepth, _depth + 1, _seen)
    } catch {
      out[key] = '[Unserializable]'
    }
  }
  return out
}

/** Convert a TimeRanges object into a plain array of {start,end}. */
export function readTimeRanges(ranges) {
  const out = []
  if (!ranges) return out
  try {
    for (let i = 0; i < ranges.length; i++) {
      out.push({ start: ranges.start(i), end: ranges.end(i) })
    }
  } catch {
    /* detached media */
  }
  return out
}
