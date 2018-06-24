import MediaSegmentList from '../../models/MediaSegmentList';
import MediaSegment from '../../models/MediaSegment';
import MediaSample from '../../models/MediaSample';
import sniffer from '../../utils/sniffer';
import Buffer from '../../write/Buffer';
import FMP4 from './Fmp4';
import emitter from '../../utils/EventEmitter';
export default class Mp4Remuxer {
    constructor () {
        this._dtsBase = 0;
        this.isLive = false;
        this._isDtsBaseInited = false;
        this._videoMeta = null;
        this._audioMeta = null;
        this._audioNextDts = null;
        this._videoNextDts = null;
        this._videoSegmentList = new MediaSegmentList('video');
        this._audioSegmentList = new MediaSegmentList('audio');
        const { browser } = sniffer;
        this._emitter = emitter;
        this._fillSilenceFrame = browser === 'ie';
    }

    destroy () {
        this._dtsBase = -1;
        this._dtsBaseInited = false;
        this._audioMeta = null;
        this._videoMeta = null;
        this._videoSegmentList.clear();
        this._audioSegmentList.clear();
        this._videoSegmentList = null;
        this._audioSegmentList = null;
    }

    remux (audioTrack, videoTrack) {
        !this._isDtsBaseInited && this.calcDtsBase(audioTrack, videoTrack);

        this._remuxVideo(videoTrack);
        this._remuxAudio(audioTrack);
    }

    seek () {
        this._videoNextDts = null;
        this._audioNextDts = null;
        this._videoSegmentList.clear();
        this._audioSegmentList.clear();
    }

    onMetaDataReady (type, meta) {
        this[`_${type}Meta`] = meta;
    }

    onMediaInfoReady (mediaInfo) {
        let ftyp_moov = new Buffer();
        let ftyp = FMP4.ftyp();
        let moov = FMP4.moov(mediaInfo);
        ftyp_moov.write(ftyp, moov);
        return ftyp_moov.buffer;
    }
    calcDtsBase (audioTrack, videoTrack) {

        let audioBase = Infinity, videoBase = Infinity;
        if (audioTrack.samples && audioTrack.samples.length) {
            audioBase = audioTrack.samples[0].dts;
        }
        if (videoTrack.samples && videoTrack.samples.length) {
            videoBase = videoTrack.samples[0].dts;
        }

        this._dtsBase = Math.min(audioBase, videoBase);
        this._isDtsBaseInited = true;
    }

    _remuxVideo (videoTrack) {
        if (!this._videoMeta) {
            return;
        }
        const track = videoTrack;
        if (!videoTrack.samples || !videoTrack.samples.length) {
            return;
        }
        let { samples } = track, dtsCorrection,
            firstDts = -1,
            lastDts = -1,
            firstPts = -1,
            lastPts = -1;

        const mp4Samples = [];
        const mdatBox = {
            samples: [],
        };
        const videoSegment = new MediaSegment();
        while (samples.length) {
            const avcSample = samples.shift();
            const { isKeyframe, cps } = avcSample;
            let dts = avcSample.dts - this._dtsBase;

            if (dtsCorrection === undefined) {
                if (!this._videoNextDts) {
                    const lastSegment = this._videoSegmentList.getLastSegmentBefore(dts);
                    if (lastSegment) {
                        let gap;
                        const { lastDts, gap: lastGap } = lastSegment;
                        gap = dts - (lastDts + lastGap) > 3 ? dts - (lastDts + lastGap) : 0;
                        dtsCorrection = dts - (lastDts + gap);
                    } else {
                        dtsCorrection = 0;
                    }
                } else {
                    dtsCorrection = dts - this._videoNextDts;
                }
            }
            const originDts = dts;
            dts -= dtsCorrection;
            const pts = dts + cps;

            if (firstDts === -1) {
                firstDts = dts;
                firstPts = pts;
            }
            let _units = [];
            while (avcSample.units.length) {
                let mdatSample = {
                    buffer: [],
                    size: 0,
                };
                const unit = avcSample.units.shift();
                _units.push(unit);
                mdatSample.buffer.push(unit);
                mdatSample.size += unit.data.byteLength;

                mdatBox.samples.push(mdatSample);
            }

            let sampleDuration = 0;

            if (samples.length >= 1) {
                const nextDts = samples[0].dts - this._dtsBase - dtsCorrection;
                sampleDuration = nextDts - dts;
            } else {
                if (mp4Samples.length >= 1) { // lastest sample, use second last duration
                    sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
                } else { // the only one sample, use reference duration
                    sampleDuration = this._videoMeta.refSampleDuration;
                }
            }

            if (isKeyframe) {
                const rap = new MediaSample({
                    dts,
                    pts,
                    duration: sampleDuration,
                    originDts: avcSample.dts,
                    position: avcSample.position,
                    isRAP: true,
                });
                videoSegment.addRAP(rap);
            }

            mp4Samples.push({
                dts,
                cps,
                pts,
                units: _units,
                size: avcSample.length,
                isKeyframe,
                duration: sampleDuration,
                originDts,
            });

        }
        const first = mp4Samples[0],
            last = mp4Samples[mp4Samples.length - 1];
        lastDts = last.dts + last.duration;
        lastPts = last.pts + last.duration;

        this._videoNextDts = lastDts;


        videoSegment.startDts = firstDts;
        videoSegment.endDts = lastDts;
        videoSegment.startPts = firstPts;
        videoSegment.endPts = lastPts;
        videoSegment.originStartDts = first.originDts;
        videoSegment.originEndDts = last.originDts + last.duration;
        videoSegment.gap = dtsCorrection;
        const firstSample = new MediaSample({
            dts: first.dts,
            pts: first.pts,
            duration: first.duration,
            isKeyframe: first.isKeyframe,
            originDts: first.originDts,
        });
        const lastSample = new MediaSample({
            dts: last.dts,
            pts: last.pts,
            duration: last.duration,
            isKeyframe: last.isKeyframe,
            originDts: last.originDts,
        });
        videoSegment.firstSample = firstSample;
        videoSegment.lastSample = lastSample;
        let moof_mdat = new Buffer();

        track.samples = mp4Samples;
        track.time = firstDts;
        const moof = FMP4.moof(track);
        const mdat = FMP4.mdat(mdatBox);
        moof_mdat.write(moof, mdat);

        if (!this.isLive) {
            this._videoSegmentList.append(videoSegment);
        }

        track.samples = [];
        track.length = 0;

        this._emitter.emit('mediaFragment', {
            type: 'video',
            data: moof_mdat.buffer.buffer,
            sampleCount: mp4Samples.length,
            fragment: videoSegment,
        });

    }

    _remuxAudio (track) {

        if (!this._audioMeta) {
            return;
        }
        const { samples } = track;
        let dtsCorrection,
            firstDts = -1,
            lastDts = -1,
            firstPts = -1,
            lastPts = -1,
            silentDuration,
            mp4Samples = [];

        const mdatBox = {
            samples: [],
        };
        if (!samples || !samples.length) {
            return;
        }
        let isFirstDtsInited = false;
        while (samples.length) {
            let sample = samples.shift();
            const { unit } = sample;
            let dts = sample.dts - this._dtsBase;

            let needSilentFrame = false;
            if (dtsCorrection === undefined) {
                if (!this._audioNextDts) {

                    const lastSegment = this._audioSegmentList.getLastSegmentBefore(dts);
                    if (lastSegment) {
                        let gap;
                        const { lastDts, gap: lastGap } = lastSegment;
                        gap = dts - (lastDts + lastGap) > 3 ? dts - (lastDts + lastGap) : 0;
                        dtsCorrection = dts - (lastDts + gap);
                    } else {
                        needSilentFrame = this._fillSilenceFrame && !this._videoSegmentList.isEmpty();
                        dtsCorrection = 0;
                    }
                } else {
                    dtsCorrection = dts - this._audioNextDts;
                }
            }
            const originDts = dts;
            dts -= dtsCorrection;

            if (needSilentFrame) {
                const videoSegment = this._videoSegmentList.getLastSampleBefore(originDts);

                if (videoSegment && videoSegment.startDts < dts) {
                    silentDuration = dts - videoSegment.startDts;
                    dts = videoSegment.startDts;
                } else {
                    needSilentFrame = false;
                }
            }

            if (!isFirstDtsInited) {
                firstDts = dts;
                isFirstDtsInited = true;
            }

            if (needSilentFrame) {
                samples.unshift(sample);
                const silentFrame = this.initSilentAudio(dts, silentDuration);
                mp4Samples.push(silentFrame);

                let mdatSample = {
                    buffer: [],
                    size: 0,
                };
                mdatSample.buffer.push({
                    data: silentFrame.unit,
                });
                mdatSample.size += silentFrame.unit.byteLength;

                mdatBox.samples.push(mdatSample);
                continue;
            }

            let sampleDuration = 0;

            if (samples.length >= 1) {
                const nextDts = samples[0].dts - this._dtsBase - dtsCorrection;
                sampleDuration = nextDts - dts;
            } else {
                if (mp4Samples.length >= 1) { // use second last sample duration
                    sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
                } else { // the only one sample, use reference sample duration
                    sampleDuration = this._audioMeta.refSampleDuration;
                }
            }

            const mp4Sample = {
                dts,
                pts: dts,
                cts: 0,
                size: unit.byteLength,
                duration: sampleDuration,
                originDts,
            };

            let mdatSample = {
                buffer: [],
                size: 0,
            };
            mdatSample.buffer.push({
                data: unit,
            });
            mdatSample.size += unit.byteLength;

            mdatBox.samples.push(mdatSample);

            mp4Samples.push(mp4Sample);
        }

        const last = mp4Samples[mp4Samples.length - 1];
        lastDts = last.dts + last.duration;

        this._audioNextDts = lastDts;


        const audioSegment = new MediaSegment();
        audioSegment.startDts = firstDts;
        audioSegment.endDts = lastDts;
        audioSegment.startPts = firstDts;
        audioSegment.endPts = lastDts;
        audioSegment.originStartDts = mp4Samples[0].originDts;
        audioSegment.originEndDts = last.originDts + last.duration;
        audioSegment.gap = dtsCorrection;
        audioSegment.firstSample = new MediaSample({
            dts: mp4Samples[0].dts,
            pts: mp4Samples[0].pts,
            duration: mp4Samples[0].duration,
            originDts: mp4Samples[0].originDts,
        });
        audioSegment.lastSample = new MediaSample({
            dts: last.dts,
            pts: last.pts,
            duration: last.duration,
            originDts: last.originDts,
        });


        track.samples = mp4Samples;
        const ftyp_moof = new Buffer();
        track.time = firstDts;
        const moof = FMP4.moof(track, firstDts);
        const mdat = FMP4.mdat(mdatBox);
        ftyp_moof.write(moof, mdat);

        if (!this.isLive) {
            this._audioSegmentList.append(audioSegment);
        }
        track.samples = [];
        track.length = 0;
        this._emitter.emit('mediaFragment', {
            type: 'audio',
            data: ftyp_moof.buffer.buffer,
            sampleCount: mp4Samples.length,
            fragment: audioSegment,
        });
    }

    initSilentAudio (dts, duration) {
        const unit = Mp4Remuxer.getSilentFrame(this._audioMeta.channelCount);
        return {
            dts,
            pts: dts,
            cps: 0,
            duration,
            unit,
            size: unit.byteLength,
            originDts: dts,
        };

    }

    static getSilentFrame (channelCount) {
        if (channelCount === 1) {
            return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80]);
        } else if (channelCount === 2) {
            return new Uint8Array([0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80]);
        } else if (channelCount === 3) {
            return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x8e]);
        } else if (channelCount === 4) {
            return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38]);
        } else if (channelCount === 5) {
            return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38]);
        } else if (channelCount === 6) {
            return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2, 0x00, 0x20, 0x08, 0xe0]);
        }
        return null;
    }
}