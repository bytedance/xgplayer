export function isLandscapeScreen(targetWindow = window) {
  return (
    Math.abs(targetWindow.orientation) === 90 ||
    Math.abs(targetWindow.screen?.orientation?.angle) === 90
  )
}
