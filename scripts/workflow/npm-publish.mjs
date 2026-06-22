import { Configuration, Project, Workspace } from '@yarnpkg/core'
import { npath } from '@yarnpkg/fslib'
import blockList from './block-list.mjs'

function isPackageVersionNotFound(e) {
  const message = [e.stdout, e.stderr, e.message].filter(Boolean).join('\n')
  return /E404|404 Not Found|No match found/.test(message)
}

async function isPackageVersionPublished(pkgName, pkgVersion) {
  try {
    const { stdout } =
      await $`yarn workspace ${pkgName} exec npm view ${pkgName}@${pkgVersion} version --json`
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

  if (await isPackageVersionPublished(pkgName, pkgVersion)) {
    console.log(pkgName, pkgVersion, 'already exists, skip publishing')
    return
  }

  await $`yarn workspace ${pkgName} exec npm publish`
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
