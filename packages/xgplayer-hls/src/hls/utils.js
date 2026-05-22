export function clamp (num, min, max) {
  if (min > max) {
    max = min
  }
  return Math.min(Math.max(num, min), max)
}
