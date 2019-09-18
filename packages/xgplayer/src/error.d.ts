declare class Errors {
  constructor(
    type: 'network' | 'mse' | 'parse' | 'format' | 'decoder' | 'runtime' | 'timeout' | 'other',
    currentTime: number,
    duration: number,
    networkState: string,
    readyState: string,
    src: string,
    currentSrc: string,
    ended: boolean,
    errd?: {
      line: string
      handle: string
      msg: string
      version: string
    }
  )
}
export default Errors
