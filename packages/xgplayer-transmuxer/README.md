# xgplayer-transmuxer

`xgplayer-transmuxer` provides low-level media parsing and remuxing utilities
for xgplayer streaming packages. Most applications should use a player-facing
streaming plugin instead.

It provides low-level building blocks for:

- FLV, MPEG-TS, MP4, and fragmented MP4 demuxing.
- Audio, video, and metadata track models.
- MP4 and fragmented MP4 remuxing.
- Codec parsing and binary readers.

Representative exports include `FlvDemuxer`, `TsDemuxer`, `MP4Demuxer`,
`FMP4Demuxer`, `MP4Remuxer`, and `FMP4Remuxer`.

The package does not provide networking, MSE lifecycle management, media
controls, or UI. Its low-level APIs evolve with the xgplayer streaming packages,
so direct integrations should pin and validate compatible versions.
