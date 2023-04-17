/* eslint-disable @typescript-eslint/ban-types */
import type { UserConfig } from 'vite'
import type { PluginVisualizerOptions } from 'rollup-plugin-visualizer'
import { PluginItem } from "@babel/core";

export declare interface Config {
  /**
   * 同 vite 的 css.preprocessorOptions 配置
   * @see https://cn.vitejs.dev/config/#css-preprocessoroptions
   */
  cssPreprocessorOptions?: Record<string, object>;
  /**
   * ES 格式打包配置，设置为 false 将关闭
   */
  es?: {
    /**
     * 是否打 es 包，输出到 es 目录
     * @default true
     */
    enabled: boolean;
    /**
     * 打包保留原始 less 或 sass 文件
     * @default true
     */
    keepCss: boolean;
    /**
     * 保留 dev 代码，__DEV__ 会转换成 process.env.NODE_ENV !== 'production'。
     * 该值为 false 会删除 dev 代码。
     * @default true
     */
    keepDev: boolean;
  } | false;
  /**
   * 是否输出 typescript 类型文件，输出到 es 目录
   * @default true
   */
  declaration?: boolean;
  /**
   * 是否将输出类型文件打成单个类型文件，输出到 dist 目录
   * 默认文件名为 'index.d.ts'
   * @default false
   */
  bundleDts?: boolean | string;
  /**
   * umd 格式全局变量名，用户可以通过 `window.{umdName}` 访问到 SDK 暴露出的对象
   */
  umdName?: string;
  /**
   * umd 格式的全局依赖名映射，适用于 peerDependencies 依赖。
   * 例如项目有个 pkg1 的 peerDependencies 依赖，这个依赖的 umdName 为 Pkg1，
   * 那么这个配置可以配置为 { pkg1: 'Pkg1' }。
   * 如果是 monorepo 并且依赖在一个 packages 目录下则不用手动配置，libd 会自己找到对应包的 umdName
   */
  umdGlobals?: Record<string, string>;
  /**
   * 本地开发时，是否需要 sourcemap。
   * @default true 
   */
  devSourceMap?: boolean;
  /**
   * 打包时是否输出 sourcemap。
   * @default true
   */
  prodSourceMap?: boolean;
  /**
   * 代码语法降级配置，是否用 babel 进行语法降级，是否自动导入 polyfill。
   * 如果开启自动导入 polyfill 则需要自己安装 core-js。
   * 语法降级程度和要导入哪些 polyfill 可以使用 package.json 中的 browserslist 字段进行配置。
   */
  legacy?: {
    /**
     * 是否启用。
     * @default true
     */
    enabled?: boolean;
    /**
     * 是否自动导入 polyfill。
     * 启用该选项需要自己安装 core-js。
     * @default false
     */
    polyfills?: boolean;
    /**
     * 对 es 格式，是否使用 babel 语法降级。
     * @default false
     */
    esEnabled?: boolean;
    /**
     * 对 es 格式，是否自动导入 polyfill。
     * @default false
     */
    esPolyfills?: boolean;
    /**
     * 需要被 babel 转义排除的包
     */
    exclude?: string | RegExp | (string | RegExp)[];
    /**
     * 需要被 babel 转义包含的包
     */
    include?: string | RegExp | (string | RegExp)[];
    /**
     * 使用transformRuntime转义代码，默认为true
     */
    transformRuntime?: boolean;
    /**
     * 传入给babel使用的插件列表
     */
    plugins?: PluginItem[] | null | undefined;
  },
  /**
   * 自定义任意打包，输出目录为 dist，
   * 默认会有一个 umd 的打包，设置为 false 将关闭
   */
  buildFormats?: (({
    /**
     * 打包的格式
     */
    format?: 'es' | 'cjs' | 'umd' | 'iife';
    /**
     * 全局变量名，可用来覆盖默认的 umdName 配置
     */
    name?: string;
    /**
     * 入口文件名，如 index2.js
     */
    input?: string;
    /**
     * 输出的文件名。
     * @default 'index.${format}.min.js'
     */
    output?: string;
    /**
     * 输出的 css 文件名。
     * @default 'index.${format}.min.css'
     */
    outputCss?: string;
    /**
     * 是否是浏览器环境。如果为 true 咋会把所有依赖都打进去，否则作为外部依赖。
     * @default true
     */
    browser?: boolean;
    /**
     * 是否启用语法降级，用于覆盖外部 legacy.enabled 配置
     */
    legacy?: boolean;
    /**
     * 是否自动导入 polyfill，用于覆盖外部 legacy.polyfills 配置
     */
    polyfills?: boolean;
    /**
     * 是否再打包 dev 版本代码。
     * 如果为 true 会根据 __DEV__ 
     * 打包 'index.${format}.dev.min.js'
     * 和 `index.${format}.prod.min.js` 版本
     * @default false
     */
    keepDev?: boolean;
  } | string)[]) | false;
  /**
   * dev 服务器配置
   * @see https://cn.vitejs.dev/config/#server-host
   */
   server: UserConfig['server'],
  /**
   * vite 插件
   * @see https://cn.vitejs.dev/config/#plugins
   */
  plugins: UserConfig['plugins'];
  /**
   * worker构建时使用的配置
   * @see https://cn.vitejs.dev/config/worker-options
   */
  worker?: UserConfig['worker'];
  /**
   * 关联的本地外部项目，例如 SDK 依赖一个外部包。但是又不想用 node_modules 下的代码，
   * 想直接引用本地的代码。可以使用该配置将外部项目加入到进来。
   * 例如 ['../pkg1']。这个 pkg1 是一个外部的 libd 项目。
   */
  projects?: string[];
  /**
   * 用于替换代码中的全局值。同 vite 的 define 配置
   * 为函数时，参数是 package.json 对象
   */
  replace?: Record<string, string> | ((pkg?: Record<string, any>) => Record<string, string>);
  /**
   * SDK 的 banner。可以是字符串或函数，函数时第一个参数 package.json 对象，第二是文件夹名
   */
  banner?: string | ((pkg: Record<string, any>, name?: string) => string);
  /**
   * svg 是否输出 svg dom 元素。默认为 base64 字符串。
   * import icon from './icon.svg'
   * const svgDom = icon()
   * @default false
   */
  svgDom?: boolean;
  /**
   * 需要从外部引入的模块，例如：
   * ```js
   * {
   *   externals: {
   *      react: 'React'
   *   }
   * }
   * 
   * ```
   */
  externals?: Record<string, string>;
  /**
   * 是否生成UMD bundle后的代码分析结果 (rollup-plugin-visualizer)
   * @see https://www.npmjs.com/package/rollup-plugin-visualizer#Options
   * @default false
   */
  visualizer?: boolean | PluginVisualizerOptions;
  /**
   * Demo 打包前的钩子，可用于修改 vite 配置
   */
  onPreBuildDemo?: (cfg: UserConfig, pkg: Record<string, object> | undefined, dir: string) => UserConfig | undefined;
  /**
   * 打包前的钩子，可用于修改 vite 配置
   */
  onPreBuild?: (cfg: UserConfig, pkg: Record<string, object>, name: string) => UserConfig | undefined;
  /**
   * 打包后的钩子
   */
  onPostBuild?: (pkg: Record<string, object>, name: string) => void;
  /**
   * dev 前的钩子，可修改 vite 配置
   */
  onPreDev?: (cfg: UserConfig) => UserConfig | undefined;
  /**
   * dev 后的钩子
   */
  onPostDev?: () => void;
  /**
   * dev 随着修改不断运行的钩子
   */
  onDevProgress?: () => void;
  /**
   * npm 包发布前运行的钩子
   */
  onPrePublish?: (pkg: Record<string, object>, name: string) => void;
  /**
   * npm 包发布后的钩子
   */
  onPostPublish?: (pkg: Record<string, object>, name: string) => void;
}

export declare function defineConfig(config: Config): Config;
