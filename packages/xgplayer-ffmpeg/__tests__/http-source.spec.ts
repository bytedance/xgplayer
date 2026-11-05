/** @jest-environment node */
import { HTTPSource } from '../src/io/http-source'
import { BlockCache } from '../src/io/block-cache'

function response(data: Uint8Array<ArrayBuffer>, start: number, size: number): Response {
  return new Response(data, {
    status: 206,
    headers: { 'Content-Range': `bytes ${start}-${start + data.length - 1}/${size}` }
  })
}

describe('bounded HTTP files', () => {
  afterEach(() => jest.restoreAllMocks())

  test('reads head and tail independently, returns short reads and retains an LRU budget', async () => {
    const bytes = Uint8Array.from({ length: 21 }, (_, index) => index)
    const ranges: string[] = []
    jest.spyOn(globalThis, 'fetch').mockImplementation(async (_url, options) => {
      const range = new Headers(options?.headers).get('Range') || ''
      ranges.push(range)
      const match = /bytes=(\d+)-(\d+)/.exec(range)!
      const start = Number(match[1])
      return response(bytes.slice(start, Number(match[2]) + 1), start, bytes.length)
    })
    const file = new HTTPSource('https://example.com/media', { blockSize: 8, cacheBytes: 16 })
    const signal = new AbortController().signal
    await file.open(signal)
    expect(await file.readAt(3, 12, signal)).toEqual(bytes.slice(3, 8))
    expect(await file.readAt(20, 8, signal)).toEqual(bytes.slice(20))
    expect(await file.readAt(21, 8, signal)).toHaveLength(0)
    await file.readAt(8, 8, signal)
    await file.readAt(0, 1, signal)
    expect(ranges).toEqual(['bytes=0-7', 'bytes=16-20', 'bytes=8-15', 'bytes=0-7'])
    expect(file.stats).toMatchObject({ cacheBytes: 16, cacheHits: 1, downloadedBytes: 29 })
    file.close()
    expect(file.stats.cacheBytes).toBe(0)
  })

  test.each<{ status: number; headers: Record<string, string>; data: Uint8Array<ArrayBuffer> }>([
    { status: 200, headers: {}, data: new Uint8Array(100) },
    { status: 206, headers: { 'Content-Range': 'bytes 1-8/20' }, data: new Uint8Array(8) },
    { status: 206, headers: { 'Content-Range': 'bytes 0-7/20' }, data: new Uint8Array(9) },
    { status: 206, headers: { 'Content-Range': 'bytes 0-7/20' }, data: new Uint8Array(7) },
    { status: 206, headers: { 'Content-Range': 'bytes 0-7/20', 'Content-Encoding': 'gzip' }, data: new Uint8Array(8) }
  ])('rejects unbounded or inconsistent responses: %p', async ({ status, headers, data }) => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(data, { status, headers }))
    const file = new HTTPSource('https://example.com/media', { blockSize: 8 })
    await expect(file.open(new AbortController().signal)).rejects.toThrow()
    expect(file.stats.cacheBytes).toBe(0)
  })

  test('uses HEAD only when CORS hides Content-Range', async () => {
    const fetchMock = jest.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(new Uint8Array(8), { status: 206 }))
      .mockResolvedValueOnce(new Response(null, { headers: { 'Content-Length': '21' } }))
    const file = new HTTPSource('https://example.com/media', { blockSize: 8 })
    await file.open(new AbortController().signal)
    expect(file.size).toBe(21)
    expect(fetchMock.mock.calls[1][1]?.method).toBe('HEAD')
  })

  test('validates resource version and separates size limit from cache limit', async () => {
    const fetchMock = jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response(
      new Uint8Array(8), { status: 206, headers: { 'Content-Range': 'bytes 0-7/21', ETag: '"v1"' } }
    )).mockResolvedValueOnce(new Response(new Uint8Array(8), {
      status: 206, headers: { 'Content-Range': 'bytes 8-15/21', ETag: '"v2"' }
    }))
    const file = new HTTPSource('https://example.com/media', { blockSize: 8, cacheBytes: 8 })
    const signal = new AbortController().signal
    await file.open(signal)
    await expect(file.readAt(8, 8, signal)).rejects.toThrow('changed')
    expect(new Headers(fetchMock.mock.calls[1][1]?.headers).get('If-Range')).toBe('"v1"')
    fetchMock.mockResolvedValue(response(new Uint8Array(8), 0, 21))
    await expect(new HTTPSource('https://example.com/media', {
      blockSize: 8, maxInputBytes: 20
    }).open(signal)).rejects.toThrow('maxInputBytes')
  })

  test('shares one block and aborts its request only after every consumer cancels', async () => {
    let activeSignal: AbortSignal | undefined
    jest.spyOn(globalThis, 'fetch').mockImplementation(async (_url, options) => {
      activeSignal = options?.signal ?? undefined
      return new Promise((_resolve, reject) => {
        activeSignal?.addEventListener('abort', () => reject(new DOMException('Cancelled', 'AbortError')))
      })
    })
    const file = new HTTPSource('https://example.com/media', { blockSize: 8 })
    const first = new AbortController()
    const second = new AbortController()
    const one = file.open(first.signal)
    const two = file.open(second.signal)
    await Promise.resolve()
    first.abort()
    await expect(one).rejects.toMatchObject({ name: 'AbortError' })
    expect(activeSignal?.aborted).toBe(false)
    second.abort()
    await expect(two).rejects.toMatchObject({ name: 'AbortError' })
    expect(activeSignal?.aborted).toBe(true)
    expect(file.stats.rangeRequests).toBe(1)
  })

  test('a new epoch can read the same block immediately after the old read is aborted', async () => {
    jest.spyOn(globalThis, 'fetch')
      .mockImplementationOnce(async (_url, options) => new Promise((_resolve, reject) => {
        options?.signal?.addEventListener('abort', () => {
          reject(new DOMException('Cancelled', 'AbortError'))
        })
      }))
      .mockResolvedValueOnce(response(new Uint8Array(8), 0, 21))
    const file = new HTTPSource('https://example.com/media', { blockSize: 8 })
    const previous = new AbortController()
    const oldRead = file.open(previous.signal)
    await Promise.resolve()
    previous.abort()
    const newRead = file.open(new AbortController().signal)
    await expect(oldRead).rejects.toMatchObject({ name: 'AbortError' })
    await newRead
    expect(file.size).toBe(21)
    expect(file.stats.rangeRequests).toBe(2)
  })

  test.each([{ blockSize: 0 }, { cacheBytes: 0 }, { blockSize: 1.5 },
    { requestOptions: { method: 'POST' } }, { requestOptions: { body: 'data' } },
    { requestOptions: { headers: { Range: 'bytes=0-' } } }
  ])('rejects unsupported source options before fetching: %p', (options) => {
    const fetchMock = jest.spyOn(globalThis, 'fetch')
    expect(() => new HTTPSource('https://example.com/media', options)).toThrow()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  test.each([
    [206, { 'Content-Range': 'unknown' }],
    [206, { 'Content-Range': 'bytes 0-7/0' }],
    [206, { 'Content-Range': 'bytes 0-7/21', 'Content-Length': '9' }]
  ] as const)('rejects invalid length metadata: %p %p', async (status, headers) => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(new Uint8Array(8), { status, headers }))
    await expect(new HTTPSource('https://example.com/media', { blockSize: 8 })
      .open(new AbortController().signal)).rejects.toThrow()
  })

  test.each([false, true])('HEAD fallback cannot use unavailable or invalid file length: %p', async (invalid) => {
    jest.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(new Uint8Array(8), { status: 206 }))
      .mockResolvedValueOnce(new Response(null, invalid
        ? { headers: { 'Content-Length': '0' } } : { status: 403 }))
    await expect(new HTTPSource('https://example.com/media', { blockSize: 8 })
      .open(new AbortController().signal)).rejects.toThrow()
  })

  test('rejects a changed file length and an absent Range body without caching them', async () => {
    const fetchMock = jest.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(response(new Uint8Array(8), 0, 21))
      .mockResolvedValueOnce(response(new Uint8Array(8), 8, 22))
    const file = new HTTPSource('https://example.com/media', { blockSize: 8 })
    const signal = new AbortController().signal
    await file.open(signal)
    await expect(file.readAt(8, 8, signal)).rejects.toThrow('length changed')
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 206, headers: {
      'Content-Range': 'bytes 8-15/21'
    } }))
    await expect(file.readAt(8, 8, signal)).rejects.toThrow('Empty HTTP Range')
  })

  test('validates absolute positions and keeps repeated open and zero-length reads local', async () => {
    const fetchMock = jest.spyOn(globalThis, 'fetch').mockResolvedValue(response(new Uint8Array(8), 0, 21))
    const file = new HTTPSource('https://example.com/media', { blockSize: 8 })
    const signal = new AbortController().signal
    await expect(file.readAt(0, 1, signal)).rejects.toThrow('Invalid source read')
    await file.open(signal)
    await file.open(signal)
    expect(await file.readAt(0, 0, signal)).toHaveLength(0)
    for (const [offset, length] of [[-1, 1], [22, 1], [0.5, 1], [0, -1], [0, Infinity]])
      await expect(file.readAt(offset, length, signal)).rejects.toThrow('Invalid source read')
    file.close()
    await expect(file.readAt(0, 1, signal)).rejects.toMatchObject({ name: 'AbortError' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  test('replacing and oversized cache blocks preserve the exact byte budget', () => {
    const cache = new BlockCache(8)
    cache.set(0, new Uint8Array(8))
    cache.set(0, new Uint8Array(4))
    cache.set(4, new Uint8Array(4))
    expect(cache.size).toBe(8)
    cache.set(0, new Uint8Array(9))
    expect(cache.size).toBe(4)
    expect(cache.get(0)).toBeUndefined()
    expect(cache.get(4)).toHaveLength(4)
  })
})
