import { defineNuxtModule, resolvePath, useLogger } from '@nuxt/kit'
import { type CSSOptions } from 'vite'
import { browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'
import { defineConfig, type Config } from './config'

import globalStylesheet from './plugins/global-stylesheet'

const MODULE_NAME = 'lightningcss'

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
  config?: string | Config
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
      const configPath = await resolvePath(config || 'lightningcss.config.ts')
      config = await import(configPath)
        .then(({ default: config }) => <Config>config)
        .catch(() => {
          config && logger.error(
            `Could not load lightningcss config from ${configPath}`
          )

          return {}
        })
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
      paths: globals
    })]

    const cssMinify = minify && !nuxt.options.dev ? 'lightningcss' : false

    nuxt.hook('vite:extend', ({ config }) => {
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
