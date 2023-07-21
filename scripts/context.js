const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const logger = require('./utils/logger')
const { Configuration, Project , Workspace } = require('@yarnpkg/core')
const { npath } = require('@yarnpkg/fslib')
function createContext () {
  const rootPath = fs.realpathSync(process.cwd())
  const rootPkgPath = path.resolve(rootPath, 'package.json')

  if (!fs.existsSync(rootPkgPath)) return {}

  const pkgsPath = path.resolve(rootPath, 'packages')
  const rootPkgInfo = fs.readJSONSync(rootPkgPath)
  const isMonorepo = fs.existsSync(pkgsPath)
  const pkgs = {}

  let hash
  try {
    hash = execa.sync('git', ['rev-parse', 'HEAD'], { stdio: 'pipe' }).stdout
  } catch (error) {
    // ignore
  }

  let rootPkg
  try {
    rootPkg = fs.readJSONSync(rootPkgPath)
  } catch (error) {
    logger.error('Cannot read root pkg. ' + rootPkgPath)
    process.exit(1)
  }

  const cfgPath = path.resolve(rootPath, 'libd.config.js')
  let configFile
  if (fs.existsSync(cfgPath)) {
    try {
      configFile = require(cfgPath)
    } catch (error) {
      logger.error('Cannot read config file. ' + cfgPath)
      process.exit(1)
    }
  }

  const isTs = function (dir) {
    return fs.existsSync(path.resolve(dir, 'src/index.ts'))
  }
  const isTsProject = (function () {
    if (!isMonorepo) return isTs(rootPath)

    const packages = fs.readdirSync(pkgsPath)
    for (let i = 0, l = packages.length; i < l; i++) {
      if (isTs(path.resolve(pkgsPath, packages[i]))) return true
    }
    return false
  })()

  const config = Object.assign({
    legacy: {
      enabled: true,
      needPolyfills: false,
      esEnabled: false,
      esNeedPolyfills: false
    },
    projects: [],
    plugins: [],
    replace: {},
    declaration: true,
    bundleDts: false,
    umdName: '',
    umdGlobals: {},
    devSourceMap: true,
    prodSourceMap: true
  }, rootPkg.libd, configFile)

  if (isMonorepo) {
    fs.readdirSync(pkgsPath).reduce((p, c) => {
      try {
        const pathName = path.resolve(pkgsPath, c)
        const pkg = require(path.resolve(pkgsPath, c, 'package.json'))
        pkgs[pkg.name] = { dir: c, path: pathName, pkg }
      } catch (error) {
        // ignore
      }
      return p
    }, {})
  }

  return {
    isTsProject,
    config,
    rootPath,
    rootPkgPath,
    rootPkgInfo,
    pkgsPath,
    isMonorepo,
    pkgs,
    getBanner (cfg, name, pkg) {
      if (!cfg.banner) return
      if (typeof cfg.banner === 'function') return cfg.banner(pkg, name)
      return cfg.banner
    },
    getReplace (cfg, pkg, isDev) {
      const user = typeof cfg.replace === 'function' ? cfg.replace(pkg) : cfg.replace
      return Object.assign(this.getDefaultReplace(pkg, isDev), user)
    },
    runPreBuildDemo (cfg, dir, pkg) {
      if (config.onPreBuildDemo) return config.onPreBuildDemo(cfg, pkg, dir)
    },
    runPreBuild (cfg, name, pkg) {
      if (config.onPreBuild) return config.onPreBuild(cfg, pkg, name)
    },
    runPostBuild (name, pkg) {
      if (config.onPostBuild) return config.onPostBuild(pkg, name)
    },
    runPreDev (cfg) {
      if (config.onPreDev) return config.onPreDev(cfg)
    },
    runPostDev () {
      if (config.onPostDev) return config.onPostDev()
    },
    runDevProgress () {
      if (config.onDevProgress) return config.onDevProgress()
    },
    runPrePublish (name, pkg) {
      if (config.onPrePublish) return config.onPrePublish(pkg, name)
    },
    runPostPublish (name, pkg) {
      if (config.onPostPublish) return config.onPostPublish(pkg, name)
    },
    /**
     * @returns {import('.').Config}
     */
    getConfig (pkg) {
      if (!pkg) return config
      return Object.assign({}, config, pkg.libd)
    },
    getDefaultReplace (pkgInfo, isDev) {
      return {
        __VERSION__: `"${pkgInfo?.version || 'unknown'}"`,
        __DEV__: isDev,
        __GIT_HASH__: `"${hash || ''}"`,
        __BUILD_TIME__: `"${new Date().toISOString()}"`,
        'process.env.NODE_ENV': isDev ? '"development"' : '"production"'
      }
    },
    getAllPublicPkgs () {
      return fs.readdirSync(pkgsPath).map(d => {
        try {
          const pkg = require(path.resolve(pkgsPath, d, 'package.json'))
          pkg.__path = path.resolve(pkgsPath, d)
          pkg.__dir = d
          return pkg
        } catch (e) {
          return false
        }
      }).filter(x => x && !x.private)
    },
    async getPkgDeps () {
      const getConfiguration = (p) => {
        return Configuration.create(p, p, new Map([]))
      }

      const portablePath = npath.toPortablePath(path.resolve(process.cwd()))
      const configuration = await getConfiguration(portablePath)
      const {project} = await Project.find(configuration, portablePath)


      const workspace = new Workspace(portablePath, {project})
      await workspace.setup()

      let packages = workspace.getRecursiveWorkspaceChildren()
      const topArr = []
      const depdended = (idHash, manifestList) => {
        return manifestList.find(
          manifest => manifest.dependencies.get(idHash) || manifest.devDependencies.get(idHash) || manifest.peerDependencies.get(idHash)
        )
      }
      let maxLoop = 100
      while (packages.length && maxLoop > 0) {
        const manifestList = packages.map(c => c.manifest)

        const noDeps = packages.filter(c => !depdended(c.locator.identHash, manifestList))
        topArr.unshift(noDeps.map(noDep => path.basename(noDep.cwd)))
        packages = packages.filter(c => !noDeps.includes(c))
        maxLoop--
        if (maxLoop === 0) {
          console.warn('There might be cycle dependencies in packages: ', packages.map(pkg => pkg.manifest.name).join(','))
        }
      }

      return topArr
    },
    isTs
  }

}

module.exports = createContext()
