import { Configuration, Project, Workspace } from '@yarnpkg/core'
import { npath } from '@yarnpkg/fslib'
import blockList from './block-list.mjs'
(async function main () {
  const getConfiguration = (p) => {
    return Configuration.create(p, p, new Map([]))
  }

  // eslint-disable-next-line no-undef
  const portablePath = npath.toPortablePath(path.resolve(process.cwd()))
  const configuration = await getConfiguration(portablePath)
  const { project } = await Project.find(configuration, portablePath)


  const workspace = new Workspace(portablePath, { project })
  await workspace.setup()

  let packages = workspace.getRecursiveWorkspaceChildren().filter(pkg => !blockList.includes(pkg.manifest.raw.name))
  await Promise.all(packages.map((pkg) => {
    const pkgName = pkg.manifest.raw.name
    // eslint-disable-next-line no-undef
    const prom = $`yarn workspace ${pkgName} exec npm publish`
    return prom
      .then(() => {
        console.log(pkgName, ' is successfully published')
      })
      .catch((e) => {
        console.error(pkgName, ' is failed to publish, reason: ', e.message)
      })
  }))
})()

