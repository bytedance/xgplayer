function _search (list, value) {
  let idx = 0

  let last = list.length - 1
  let mid = 0
  let lbound = 0
  let ubound = last

  if (value < list[0]) {
    idx = 0
    lbound = ubound + 1 // skip search
  }

  while (lbound <= ubound) {
    mid = lbound + Math.floor((ubound - lbound) / 2)
    if (mid === last || (value >= list[mid] && value < list[mid + 1])) {
      idx = mid
      break
    } else if (list[mid] < value) {
      lbound = mid + 1
    } else {
      ubound = mid - 1
    }
  }

  return idx
}

function getNearestKeyframe (seconds, keyframes) {
  if (!keyframes) return
  let keyframeIdx = _search(keyframes.times, seconds)

  return {
    index: keyframeIdx,
    seconds: keyframes.times[keyframeIdx],
    fileposition: keyframes.filepositions[keyframeIdx]
  }
}

export {
  getNearestKeyframe
}
