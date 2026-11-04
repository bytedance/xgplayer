# xgplayer-ffmpeg

An experimental FFmpeg streaming plugin for xgplayer MSE. This private workspace package reads HTTP(S) input incrementally and appends fragmented MP4 while downloading continues. The default profile converts the first audio track to AAC-LC; encoding policy is separate from the common loading, Worker and MSE lifecycle.

```bash
yarn dev:ffmpeg
```

The demo prepares the pinned single-thread `@ffmpeg/core` with Asyncify using a local Binaryen/Emscripten `wasm-opt`. Complete JS/WASM pairs are published atomically in fingerprinted directories outside the repository. Deploy the prepared pair together with the bundled streaming Worker. The plugin needs no cross-origin isolation, COOP/COEP or SharedArrayBuffer. Output acknowledgements propagate MSE backpressure to the HTTP reader. Local File/Blob input is unsupported.

Format support depends on the demuxer, decoder and input parameters. Native FFprobe reads duration metadata from at most 64 KiB of the existing HTTP stream; FFmpeg replays that prefix before continuing the same reader. Known duration is applied through the MSE API before the first append, while FFmpeg output bytes remain unchanged. Inputs without a finite probe duration keep unknown duration until the final append. Seeking ahead waits for transcoding to reach the target; seeking to evicted data reloads the source. Containers requiring tail metadata or seeking cannot universally start early from sequential input. The provided profile converts audio to AAC-LC.

See [usage, options and verification limits](./README.zh-CN.md) and [core composition, preparation and extension](./src/core/README.md).
