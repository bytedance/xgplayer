import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { publishRelease } = require('./release-archives')
const archiveDir = process.argv[2]
if (!archiveDir) throw new Error('A directory containing release archives is required')

await publishRelease({ archiveDir })
