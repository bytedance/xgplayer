export const LoaderType = {
  FETCH: 'fetch',
  XHR: 'xhr'
} as const

export type LoaderType = (typeof LoaderType)[keyof typeof LoaderType]

export const ResponseType = {
  ARRAY_BUFFER: 'arraybuffer',
  TEXT: 'text',
  JSON: 'json'
} as const

export type ResponseType = (typeof ResponseType)[keyof typeof ResponseType]
