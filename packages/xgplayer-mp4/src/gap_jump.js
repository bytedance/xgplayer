/***
 * 音视频源数据不对齐或者 关键视频帧存在cts，导致浏览器播不动场景下
 *
 * reference shakaplayer, 借鉴shakaplayer，根据项目逻辑进行改造
 */

import IntervalTimer from './util/intervalTimer';
export default class GapJump {
 
    constructor(player, config) {
        this.player = player;
        this.mediaElem = player.video;
        this.config = config;
        this.timer = new IntervalTimer();

        this.prevReadyState = this.mediaElem.readyState;
        this.didFireLargeGap = false;
        this.seekingEventReceived = false;
        this.segmentAppended = false;
        this.onWaitFunc = this._onWaiting.bind(this);
        this.onPlayFunc = this._onPlay.bind(this);
        this.isSafari = /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
        if (this.config.useGapJump !== false) {
            this._start();
        }

        this.hasPlayed = false;
    }
    _onWaiting() {
        this.onGapJump('_onWaiting');
    }

    _onPlay() {
        this.hasPlayed = true;
    }

    _start() {
        this.mediaElem.addEventListener('waiting', this.onWaitFunc);
        this.mediaElem.addEventListener('play', this.onPlayFunc);
        //250ms
        this.timer.repeat(() => {
            this.onGapJump('repeat');
        }, 250);
    }

    onSegmentAppend() {
        this.segmentAppended = true;
        this.onGapJump('onSegmentAppend');
    }
 
    onSeeking() {
        this.seekingEventReceived = true;
        this.segmentAppended = false;
        this.didFireLargeGap = false;
    }
 
    onGapJump(type) {
        if (this.mediaElem.readyState === HTMLMediaElement.HAVE_NOTHING) {
            return;
        }
        if (this.mediaElem.seeking) {
            if (!this.seekingEventReceived) { return; }
        } else {
            this.seekingEventReceived = false;
        }

        if (this.mediaElem.paused && this.mediaElem.currentTime !== 0 && this.hasPlayed) {
            return;
        }
        if (this.mediaElem.readyState !== this.prevReadyState) {
            this.didFireLargeGap = false;
            this.prevReadyState = this.mediaElem.readyState;
        }

        const buffered = this.mediaElem.buffered;
        const smallGapLimit = this.config.smallGapLimit || 0.5;
        const gapDetectionThreshold = this.config.gapDetectionThreshold || 0.1;
        const currentTime = this.mediaElem.currentTime;
        const idx = this._getIndex(buffered, currentTime, gapDetectionThreshold);
        if (idx === null) {
            return;
        }
        if (idx === 0 && !this.segmentAppended) {
            return;
        }

        const jumpTo = buffered.start(idx) + 0.1;
        const seekEnd = this.mediaElem.duration;

        if (jumpTo > seekEnd) {
            return;
        }
        const jumpSize = jumpTo - currentTime;
        const isGapSmall = jumpSize <= smallGapLimit;
        let jumpLargeGap = false;
        if (jumpSize < GapJump.BROWSER_GAP_TOLERANCE) {
            return;
        }
        //对于分片缺失，目前未处理
        if (isGapSmall) {
            if (this.config.disableGapSetPosition !== true) {
                this.mediaElem.currentTime = this.isSafari ? jumpTo + 0.1 : jumpTo;
            }
            this.player && this.player.emit('detectGap');
        }

    }
 
    _getIndex(buffered, time, threshold) {
        if (!buffered || !buffered.length) {
            return null;
        }
        if (buffered.length === 1 && buffered.end(0) - buffered.start(0) < 1e-6) {
            return null;
        }
        const bufferedInfo = this._getBuffered(buffered);
        let idx = null;
        for (let i = 0; i < bufferedInfo.length; i++) {
            let item = bufferedInfo[i];
            if (item.start > time && (i === 0 || bufferedInfo[i - 1].end - time <= threshold)) {
                idx = i;
                break;
            }
        }
        return idx;
    }
 
    _getBuffered(b) {
        if (!b) {
            return [];
        }
        const ret = [];
        for (let i = 0; i < b.length; i++) {
            ret.push({
                start: b.start(i),
                end: b.end(i)
            });
        }
        return ret;
    }

    destroy() {
        this.mediaElem.removeEventListener('waiting', this.onWaitFunc);
        this.mediaElem.removeEventListener('play', this.onPlayFunc);
        this.timer.clear();
        this.timer = null;
    }
 }
 
 GapJump.BROWSER_GAP_TOLERANCE = 0.001;
 