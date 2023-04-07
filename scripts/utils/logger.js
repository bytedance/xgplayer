const { cyan, yellow, green, bold, bgRedBright, dim, options, red } = require('colorette')

if (process.env.FORCE_COLOR === '0' || process.env.NO_COLOR) {
  options.enabled = false
}

const stderr = console.error.bind(console)

module.exports = {
  error (msg) {
    console.log(bold(bgRedBright('\nERROR: ' + msg)))
  },
  success (msg) {
    console.log(green(msg))
  },
  warning (msg) {
    console.log(bold(yellow('\nWARNING: ' + msg)))
  },
  info (msg) {
    console.log(cyan(msg))
  },
  dim (msg) {
    console.log(dim(msg))
  },
  step (msg) {
    console.log(bold(cyan(msg)))
  },
  handleError (err, recover = false) {
    let description = err.message || err
    if (err.name) description = `${err.name}: ${description}`
    const message = (err.plugin ? `(plugin ${err.plugin}) ${description}` : description) || err

    stderr(bold(red(`[!] ${bold(message.toString())}`)))

    if (err.url) {
      stderr(cyan(err.url))
    }

    if (err.loc) {
      stderr(`${err.loc.file || err.id} (${err.loc.line}:${err.loc.column})`)
    } else if (err.id) {
      stderr(err.id)
    }

    if (err.frame) {
      stderr(dim(err.frame))
    }

    if (err.stack) {
      stderr(dim(err.stack))
    }

    stderr('')

    if (!recover) process.exit(1)
  }
}
