# xgplayer-ffmpeg

Experimental audio playback through native FFmpeg and MSE. This private workspace package supports WMA/ASF, FLAC, WAV and explicitly configured raw PCM. It uses bounded HTTP Range reads, a persistent demuxer in a Worker, and demand-driven fMP4 output.

The default audio policy preserves source parameters where AAC supports them. FLAC is copied when the selected MSE supports FLAC; other supported inputs use AAC-LC. Unbuffered seeking uses FFmpeg's native time index and preserves the Worker, source cache and MediaSource.

```bash
# Activate Emscripten 6.0.10 first.
yarn ffmpeg:runtime
yarn dev:ffmpeg
```

The preparation command builds the original bridge against pinned FFmpeg 8.0 source and publishes an immutable JS/WASM pair, license and build manifest outside the repository. Deploy that pair together with the bundled `worker.js`. No COOP/COEP, SharedArrayBuffer or cross-origin isolation is needed.

HTTP sources must have a fixed length and return exact 206 ranges. Each request is at most 128 KiB; the default LRU cache is 8 MiB. High/low media water marks stop future pull commands and therefore stop future native reads. One in-flight request and finite demuxer read-ahead may complete. Non-Range servers and File/Blob input are unsupported.

See [usage and options](./README.zh-CN.md), [native core and ownership](./src/core/README.md), [architecture](./IO-DESIGN.md) and [open-source evaluation](./OPEN-SOURCE-MSE.md). Unit tests cover scheduling, cancellation and recovery; `native/verify.mjs` exercises real WASM seeks and decodes its fMP4 output with FFmpeg. Independent Chrome checks passed bounded paused loading, seeks, source changes, all three audio paths, EOS recovery and demo controls. Safari/MMS devices, seek-boundary listening and low-end resource measurements remain unverified.
