import EventEmitter from 'eventemitter3'
import { ManifestLoader } from './manifest-loader'
import { Playlist } from './playlist'
import { SegmentLoader } from './segment-loader'
import { getConfig } from './config'
import { StreamingError, Logger } from 'xgplayer-streaming-shared'
import { Event } from './constants'

const logger = new Logger('hls-preloader')

export class HlsPreloader extends EventEmitter{

    _manifestLoader = null
    _segmentLoader = null

    constructor (urls, cfg) {
      super()
      this._urls = urls || []
      cfg = cfg || {}
      cfg.media = true
      this.config = cfg = getConfig(cfg)
      this._manifestLoader = new ManifestLoader(this)
      this._segmentLoader = new SegmentLoader(this)
      this._playlist = new Playlist(this)
      this._isPreloading = false
    }

    preload (urls){
      if (Array.isArray(urls)){
        this._urls = this._urls.concat(urls)
      }
      if (!this._isPreloading){
        this._preloadNext()
      }
    }

    async _preloadNext (){
      const urls = this._urls
      if (!urls || !urls.length) return
      const { startTime, url } = urls.shift()
      this._isPreloading = true
      if (!url){
        this._preloadNext()
        return
      }
      const manifest = await this._loadM3U8(url)
      if (startTime) {
        this._playlist.setNextSegmentByIndex(this._playlist.findSegmentIndexByTime(startTime) || 0)
      }
      if (!manifest) {
        return
      }
      await this._loadSegment()
      this._preloadNext()
    }

    async _loadM3U8 (url) {
      let playlist
      try {
        const manifest = this.config.manifestList?.filter(x => x.url === url)[0]?.manifest;

        [playlist] = manifest
          ? this._manifestLoader.parseText(manifest, url) :
          await this._manifestLoader.load(url)
      } catch (error) {
        throw this._emitError(StreamingError.create(error))
      }
      if (!playlist) return
      this._playlist.upsertPlaylist(playlist)

      if (playlist.isMaster) {
        if (this._playlist.currentStream.subtitleStreams?.length) {
          this.emit(Event.SUBTITLE_PLAYLIST, {
            list: this._playlist.currentStream.subtitleStreams
          })
        }
        await this._refreshM3U8()
      }
      this.emit(Event.STREAM_PARSED)
      return playlist
    }

    async _loadSegment (){
      const seg = this._playlist.nextSegment
      if (!seg) return
      const audioSeg = this._playlist.getAudioSegment(seg)
      try {
        logger.log(`load segment, sn:${seg.sn}, [${seg.start}, ${seg.end}], partIndex:${seg.partIndex}`)
        await this._segmentLoader.load(seg, audioSeg)
      } catch (error) {
        console.error(error)
      } finally {
        this._isPreloading = false
      }
    }

    async cancel (){
      this._urls = []
      await this._manifestLoader.cancel()
      await this._segmentLoader.cancel()
      this._isPreloading = false
      // 检测取消期间是否有新数据需要加载
      this._preloadNext()
    }

}