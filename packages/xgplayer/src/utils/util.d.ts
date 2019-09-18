export type Util = {
  createDom(el?: string, tpl?: string, attrs?: object, cname?: string): HTMLElement
  hasClass(el: HTMLElement, className: string): boolean
  addClass(el: HTMLElement, className: string): void
  removeClass(el: HTMLElement, className: string): void
  toggleClass(el: HTMLElement, className: string): void
  findDom(el: Document | undefined, sel: string): Element | null | undefined
  padStart(str: number, length: number, pad: number): string
  format(time: number): string
  event(e: any): void
  typeOf(obj: unknown): string
  deepCopy(dst: any, src: any): any
  getBgImage(el: Element): string
  copyDom(dom: HTMLElement): '' | HTMLElement
  setInterval(context: any, eventName: string, intervalFunc: Function, frequency: number): void
  clearInterval(context: any, eventName: string): void
  createImgBtn(name: string, imgUrl: string, width: string, height: string): HTMLElement
  Hex2RGBA(hex: string, alpha: number): string
}

declare let util: Util
export default util
