export interface Sniffer {
  readonly device: 'pc' | 'mobile'
  readonly browser?: 'ie' | 'firfox' | 'chrome' | 'opera' | 'safari'
  readonly os: {
    isTablet: boolean
    isPhone: boolean
    isAndroid: boolean
    isPc: boolean
    isSymbian: boolean
    isWindowsPhone: boolean
    isFireFox: boolean
  }
}

declare let sniffer: Sniffer
export default sniffer