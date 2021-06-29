export default PresetPlayer;
declare class PresetPlayer extends Player {
    static defaultPreset: typeof defaultPreset;
    static Util: import("./utils/util").default;
    static Sniffer: import("./utils/sniffer").default;
    static Errors: any;
    static Events: import("./events").default;
    static Plugin: any;
    static BasePlugin: any;
    static I18N: import("./lang").default;
}
import Player from "./player";
import defaultPreset from "./presets/default";
