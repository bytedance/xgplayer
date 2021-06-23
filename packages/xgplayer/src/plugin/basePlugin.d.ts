declare class BasePlugin {
    static defineGetterOrSetter(Obj: any, map: any): void;
    constructor(args: any);
    __args: any;
    __events: {};
    config: any;
    onPluginsReady(): void;
    __init(args: any): void;
    updateLang(lang: any): void;
    get lang(): any;
    get i18n(): any;
    get i18nKeys(): any;
    on(event: any, callback: any): void;
    once(event: any, callback: any): void;
    off(event: any, callback: any): void;
    offAll(): void;
    emit(event: any, res: any): void;
    registerPlugin(plugin: any, options?: {}, name?: string): any;
    getPlugin(name: any): any;
    __destroy(): void;
}
import Util from "../utils/util";
import Sniffer from "../utils/sniffer";
import Errors from "../error";
import * as Events from "../events";
import XG_DEBUG from "../utils/debug";
export { BasePlugin as default, Util, Sniffer, Errors, Events, XG_DEBUG };
