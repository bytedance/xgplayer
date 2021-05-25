/**
 * @typedef {Object} TsFragProps
 * @property {number} start
 * @property {number} duration
 * @property {url} url
 * @property {boolean} discontinue
 * @property {number} id
 * @property {number} cc
 */
export default class TsFrag {
  /**
   *
   * @return TsFrag
   */
  static getDefault () {
    return {
      id: -1,
      url: '',
      start: -1,
      duration: -1,
      discontinue: false,
      cc: -1
    }
  }
  /**
   *
   * @param {TsFragProps} props
   */
  constructor (props) {
    const merged = Object.assign({}, TsFrag.getDefault(), props);
    /**
     * @type {TsFragProps.id}
     */
    this.id = merged.id;
    /**
     * @type {TsFragProps.url}
     */
    this.url = merged.url;
    /**
     * @type {TsFragProps.start}
     */
    this.start = merged.start;
    /**
     * @type {TsFragProps.duration}
     */
    this.duration = merged.duration;
    /**
     * @type {TsFragProps.discontinue}
     */
    this.discontinue = merged.discontinue;
    /**
     * @type {TsFragProps.cc}
     */
    this.cc = merged.cc;
  }
}
