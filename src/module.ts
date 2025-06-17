import {
  defineNuxtModule,
  resolvePath,
  useLogger,
  extendViteConfig
} from '@nuxt/kit'

import { type CSSOptions } from 'vite'
import { createJiti } from 'jiti'
import { browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'
import { defineConfig, type Config } from './config'

import globalStylesheet from './plugins/global-stylesheet'

const MODULE_NAME = 'lightningcss'
const CONFIGURATION_FILE = 'lightningcss.config.ts'

export interface ModuleOptions {
  /**
   * Paths to global stylesheets
   * @default undefined
   */
  globals?: string[]

  /**
   * Wether to minify stylesheets
   * @default true
   */
  minify: boolean

  /**
   * Lightningcss configuration object or path relative to nuxt rootDir
   * @default 'lightningcss.config.ts'
   */
  config?: Config | string
}

export default defineNuxtModule<ModuleOptions>({
   meta: {
    name: MODULE_NAME,
    configKey: 'lightningcss'
  },

  defaults: {
    minify: true
  },

  async setup({
    globals,
    minify,
    config
  }, nuxt): Promise<void> {
    const logger = useLogger(MODULE_NAME)

    if (!config || typeof config === 'string') {
      nuxt.options.watch.push(await resolvePath(config || CONFIGURATION_FILE))

      try {
        const jiti = createJiti(import.meta.url)
        const {
          default: importedConfig
        } = await jiti.import<{
          default?: Config
        }>(await resolvePath(config || CONFIGURATION_FILE))

        if (!importedConfig || typeof importedConfig !== 'object') {
          config ||= CONFIGURATION_FILE
          throw new Error('Default export is not a valid configuration object.')
        }

        config = importedConfig
      } catch (error) {
        config && logger.error(`Could not load config from ${config}:`, error)
        config = undefined
      }
    }

    const cssOptions: CSSOptions = {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist(browserslist.loadConfig({
          path: await resolvePath('.')
        }))),
        ...config
      }
    }

    const plugins = !globals?.length ? [] : [globalStylesheet({
      paths: await Promise.all(globals.map(path => resolvePath(path)))
    })]

    const cssMinify = minify && !nuxt.options.dev ? 'lightningcss' : false

    extendViteConfig((config) => {
      config.build!.cssMinify = cssMinify
      config.css = cssOptions
      config.plugins = [...plugins, ...config.plugins!]
    })
  }
})

export {
  defineConfig as defineLightningCSSConfig,
  type Config as LightningCSSConfig
}
