#!/usr/bin/env node

const dev = require('./commands/dev')
const build = require('./commands/build')
const buildDemo = require('./commands/build-demo')
const link = require('./commands/link')
const changelog = require('./commands/changelog')
const release = require('./commands/release')
const cli = require('sade')('libd')

process.on('unhandledRejection', err => {
  throw err
})

cli
  .command('dev [dir]', 'Start dev server')
  .option('-p, --port', 'Dev server port', 8081)
  .option('-o, --open', 'Open browser window on startup')
  .action((dir, { port, open }) => {
    dev(dir, Number(port), open)
  })

cli
  .command('build [pkg]', 'Build package')
  .action((pkg) => {
    build(pkg)
  })

cli
  .command('build-demo <dir>', 'Build demo')
  .action((dir) => {
    buildDemo(dir)
  })

cli
  .command('link', 'Link all packages')
  .action(() => {
    link()
  })

cli
  .command('changelog', 'Generate or update CHANGELOG.md')
  .option('-s, --single', 'monorepo only generates one CHANGELOG.md')
  .action(({ single }) => {
    changelog(single)
  })

cli
  .command('release', 'Release packages')
  .option('-l, --skipLint', 'Skip lint step')
  .option('-t, --skipTest', 'Skip test step')
  .option('-b, --skipBuild', 'Skip build step')
  .option('-p, --skipPublish', 'Skip publish step')
  .option('-s, --buildScript', 'Custom build npm script')
  .action(({ skipLint, skipTest, skipBuild, skipPublish, buildScript}) => {
    release(skipLint, skipTest, skipBuild, skipPublish, buildScript)
  })

cli.version(require('../package.json').version)
cli.parse(process.argv)
