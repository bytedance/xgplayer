declare class Plugin extends BasePlugin {
    /**
      * 插入dom结构
      * @param {String | Element} html html字符串或者dom
      * @param {Element} parent
      * @param {*} index
      */
    static insert(html: string | Element, parent: Element, index?: any): Element;
    static get defaultConfig(): {};
    static delegate(root: any, querySelector: any, eventType: any, callback: any, capture?: boolean): any[];
    constructor(args?: {});
    __delegates: any[];
    icons: {};
    langText: {};
    __registeChildren(): void;
    _children: any[];
    changeLangTextKey(dom: any, key?: string): void;
    plugins(): any[];
    children(): {};
    registerIcons(): {};
    registerLangauageTexts(): {};
    find(qs: any): any;
    bind(querySelector: any, eventType: any, callback: any, ...args: any[]): void;
    unbind(querySelector: any, eventType: any, callback: any, ...args: any[]): void;
    setStyle(name: any, value: any): any;
    setAttr(name: any, value: any): any;
    setHtml(htmlStr: any, callback: any): void;
    bindEL(event: any, eventHandle: any, isBubble?: boolean): void;
    unbindEL(event: any, eventHandle: any, isBubble?: boolean): void;
    show(value: any): string;
    hide(): void;
    appendChild(pdom: any, child: any, ...args: any[]): any;
    render(): string;
    destroy(): void;
}
declare namespace Plugin {
    export { POSITIONS };
    export { ROOT_TYPES };
}
export namespace ROOT_TYPES {
    const CONTROLS: string;
    const ROOT: string;
}
export namespace POSITIONS {
    const ROOT_1: string;
    export { ROOT_1 as ROOT };
    export const ROOT_LEFT: string;
    export const ROOT_RIGHT: string;
    export const ROOT_TOP: string;
    export const CONTROLS_LEFT: string;
    export const CONTROLS_RIGTH: string;
    export const CONTROLS_RIGHT: string;
    export const CONTROLS_CENTER: string;
    const CONTROLS_1: string;
    export { CONTROLS_1 as CONTROLS };
}
import BasePlugin from "./basePlugin";
export { Plugin as default };
