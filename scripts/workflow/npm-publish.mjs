import { Configuration, Project, Workspace } from '@yarnpkg/core'
import { npath } from '@yarnpkg/fslib'
import { spawn } from 'node:child_process'
import path from 'node:path'
import blockList from './block-list.mjs'

function createCommandError(command, args, code, stdout, stderr) {
  const details = stderr.trim() || stdout.trim()
  const error = new Error(
    `Command failed: ${command} ${args.join(' ')}${details ? `\n${details}` : ''}`
  )
  error.code = code
  error.stdout = stdout
  error.stderr = stderr
  return error
}

function readCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe']
    })
    let stdout = ''
    let stderr = ''

    child.stdout.on('data', chunk => {
      stdout += chunk
    })
    child.stderr.on('data', chunk => {
      stderr += chunk
    })
    child.on('error', reject)
    child.on('close', code => {
      if (code === 0) {
        resolve({ stdout, stderr })
      } else {
        reject(createCommandError(command, args, code, stdout, stderr))
      }
    })
  })
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: process.env,
      stdio: 'inherit'
    })

    child.on('error', reject)
    child.on('close', code => {
      if (code === 0) {
        resolve()
      } else {
        reject(createCommandError(command, args, code, '', ''))
      }
    })
  })
}

function isPackageVersionNotFound(e) {
  const message = [e.stdout, e.stderr, e.message].filter(Boolean).join('\n')
  return /E404|404 Not Found|No match found/.test(message)
}

async function isPackageVersionPublished(pkgName, pkgVersion, cwd) {
  try {
    const { stdout } = await readCommand(
      'npm',
      ['view', `${pkgName}@${pkgVersion}`, 'version', '--json'],
      { cwd }
    )
    const publishedVersion = stdout.trim().replace(/^"|"$/g, '')
    return publishedVersion === pkgVersion
  } catch (e) {
    if (isPackageVersionNotFound(e)) {
      return false
    }
    throw e
  }
}

async function publishPackage(pkg) {
  const pkgName = pkg.manifest.raw.name
  const pkgVersion = pkg.manifest.raw.version
  const pkgCwd = npath.fromPortablePath(pkg.cwd)

  if (await isPackageVersionPublished(pkgName, pkgVersion, pkgCwd)) {
    console.log(pkgName, pkgVersion, 'already exists, skip publishing')
    return
  }

  await runCommand('npm', ['publish'], { cwd: pkgCwd })
  console.log(pkgName, ' is successfully published')
}

;(async function main() {
  const getConfiguration = p => {
    return Configuration.create(p, p, new Map([]))
  }

  const portablePath = npath.toPortablePath(path.resolve(process.cwd()))
  const configuration = await getConfiguration(portablePath)
  const { project } = await Project.find(configuration, portablePath)

  const workspace = new Workspace(portablePath, { project })
  await workspace.setup()

  const packages = workspace
    .getRecursiveWorkspaceChildren()
    .filter(pkg => !blockList.includes(pkg.manifest.raw.name))
  const results = await Promise.allSettled(packages.map(publishPackage))
  const failedPackages = results.reduce((ret, result, index) => {
    if (result.status === 'rejected') {
      const pkgName = packages[index].manifest.raw.name
      console.error(pkgName, ' is failed to publish, reason: ', result.reason.message)
      ret.push(pkgName)
    }
    return ret
  }, [])

  if (failedPackages.length) {
    throw new Error(`Publish failed for packages: ${failedPackages.join(', ')}`)
  }
})()
