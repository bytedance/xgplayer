export default class MediaInfo {
    constructor (data) {
        const _default = {
            mimeType: null,
            codec: '',
            duration: null,
            hasAudio: false,
            hasVideo: false,
            audioCodec: null,
            videoCodec: null,

            videoDataRate: null,
            audioDataRate: null,
            audioSampleRate: null,
            audioChannelCount: null,
            audioConfig: null,

            width: null,
            height: null,
            fps: null,
            profile: null,
            level: null,
            chromaFormat: null,

            pixelRatio: [],

            _metaData: null,
            segments: [],
            hasKeyframes: null,
            keyframes: [],
        };

        const initData =  Object.assign({}, _default, data);
        Object.entries(initData).forEach(([k, v])=> {
            this[k] = v;
        });

    }
    get isComplete () {
        const { mimeType, duration, hasKeyframes } = this;
        return mimeType !== null
            && duration !== null
            && hasKeyframes !== null
            && this.isVideoInfoFilled
            && this.isAudioInfoFilled;
    }
    get isAudioInfoFilled () {
        const { hasAudio,
            audioCodec,
            audioSampleRate,
            audioChannelCount,
        } = this;

        return !!(!hasAudio || (hasAudio && audioCodec && audioSampleRate && audioChannelCount));

    }

    get isVideoInfoFilled () {
        const notNullFields = [
            'videoCodec',
            'width',
            'height',
            'fps',
            'profile',
            'level',
            'chromaFormat',
        ];
        for (let i = 0, len = notNullFields.length; i < len; i++) {
            if (this[notNullFields[i]] === null) { return false; }
        }

        return this.hasVideo;
    }

}