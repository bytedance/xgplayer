/* eslint-disable no-undef */
interface Util {
  createDom(el: string, tpl?:string, attrs?: object, cname?:string): HTMLElement | null;
  createDomFromHtml (html: string, attrs?:object, classname?:string): HTMLElement | null;
  hasClass (el: HTMLElement, className: string): boolean;
  addClass(el: HTMLElement, className: string): void;
  removeClass(el: HTMLElement, className: string): void;
  toggleClass(el: HTMLElement, className: string): void;
  findDom(el: HTMLElement, sel: string): HTMLElement | null;
  getCss(dom: HTMLElement, key: string): string;
  padStart(str: string | number, length: number, pad: number): string;
  format(time: number): string;
  event(e: Event): void;
  typeOf (obj: any): string;
  deepCopy(dst: object, src: object): object;
  deepMerge(dst: object, src: object): object;
  getBgImage(el: HTMLElement): string;
  copyDom(dom: HTMLElement): HTMLElement | '';
  setInterval(context: any, eventName: string, intervalFunc: any, frequency: number): void;
  clearInterval(context: any, eventName: string): void;
  createImgBtn(name: string, imgUrl: string, width: number | string, height: number | string): HTMLElement;
  Hex2RGBA(hex: string, alpha: string): string;
  getFullScreenEl(): HTMLElement | null;
  checkIsFunction(fun: any): boolean;
  checkIsObject(obj: any): boolean;
  hide(dom: HTMLElement): void;
  show(dom: HTMLElement, display?: string): void;
  isUndefined(val: any): boolean;
  setStyleFromCsstext(dom: HTMLElement, text: string): void;
  preloadImg(url: string, onload?: any, onerror?: any): void;
  stopPropagation(e: Event): void;
}

export default Util
