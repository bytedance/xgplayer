export default class SEIOnDemand {
    constructor(player: any, parent: any);
    _seiQueue: any[];
    _baseDts: number;
    _timer: number;
    _player: any;
    _parent: any;
    updateBaseDts(baseDts: any): void;
    append(sei: any): void;
    _bootCheckEmitSEI(): void;
    _checkEmitSEI: () => void;
    destroy(): void;
}
