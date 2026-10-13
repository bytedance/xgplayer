/* Lightweight validation: JSON manifest + syntax-check all src JS files. */
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const root = path.resolve(__dirname, '..')
let failed = 0

// 1. manifest.json is valid JSON
try {
  JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'))
  console.log('✓ manifest.json valid')
} catch (e) {
  console.error('✗ manifest.json invalid:', e.message)
  failed++
}

// 2. syntax-check every .js under src
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) walk(p)
    else if (name.endsWith('.js')) {
      try {
        execSync(`node --check "${p}"`, { stdio: 'pipe' })
        console.log('✓', path.relative(root, p))
      } catch (e) {
        console.error('✗', path.relative(root, p), '\n', e.stderr.toString())
        failed++
      }
    }
  }
}
walk(path.join(root, 'src'))

process.exit(failed ? 1 : 0)
