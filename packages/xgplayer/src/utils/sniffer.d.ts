interface OS_TYPE {
  isTablet: boolean;
  isPhone: boolean;
  isIos: boolean;
  isAndroid: boolean;
  isPc: boolean;
  isSymbian: boolean;
  isWindowsPhone: boolean;
  isFireFox: boolean
}

interface Sniffer{
  device: string;
  browser: string;
  os: OS_TYPE;
  isWeixin: boolean;
}

export default Sniffer
