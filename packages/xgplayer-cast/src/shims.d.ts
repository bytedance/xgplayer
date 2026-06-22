declare module '*.svg' {
  const icon: string
  export default icon
}

declare module '*.scss'

declare const WebKitPlaybackTargetAvailabilityEvent: {
  new (...args: any[]): Event
}

interface Window {
  cast?: any
  chrome?: any
  __onGCastApiAvailable?: (isAvailable: boolean) => void
}

interface HTMLMediaElement {
  webkitShowPlaybackTargetPicker?: () => void
  webkitCurrentPlaybackTargetIsWireless?: boolean
  webkitWirelessVideoPlaybackDisabled?: boolean
}
