import { LoaderType, ResponseType } from './types'

export function getConfig (cfg) {
  return {
    loaderType: LoaderType.FETCH,
    retry: 0,
    retryDelay: 0, // ms
    timeout: 0,
    request: null, // Request
    onTimeout: undefined,
    onProgress: undefined,
    onRetryError: undefined,
    transformRequest: undefined,
    transformResponse: undefined,
    transformError: undefined,
    responseType: ResponseType.TEXT,
    range: undefined,
    url: '',
    params: undefined,
    method: 'GET',
    headers: {},
    body: undefined,
    mode: undefined,
    credentials: undefined,
    cache: undefined,
    redirect: undefined,
    referrer: undefined,
    referrerPolicy: undefined,
    integrity: undefined,
    onProcessMinLen: 0,
    processMaxGapTime: Infinity, // process流式获取数据时，在请求没有结束前，两次读取到数据的最大超时时间
    ...cfg
  }
}
