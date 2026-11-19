export function clamp(num: number, min: number, max: number): number {
  if (min > max) {
    max = min
  }
  return Math.min(Math.max(num, min), max)
}
