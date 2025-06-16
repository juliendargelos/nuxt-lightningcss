import { defineNuxtModule, resolvePath } from '@nuxt/kit'
import { type CSSOptions } from 'vite'
import { browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'
import { defineConfig, type Config } from './config'

import globalStylesheet from './plugins/global-stylesheet'

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
   * Lightningcss configuration file or object
   * @default '~~/lightningcss.config.ts'
   */
  config: string | Config
}

export default defineNuxtModule<ModuleOptions>({
   meta: {
    name: 'lightningcss',
    configKey: 'lightningcss'
  },

  defaults: {
    minify: true,
    config: '~~/lightningcss.config.ts'
  },

  async setup({
    globals,
    minify,
    config
  }, nuxt): Promise<void> {
    if (typeof config === 'string') {
      console.log(await resolvePath(config))
      config = await import(await resolvePath(config))
        .then(({ default: config }) => <Config>config)
        .catch(() => ({}))
    }

    const cssOptions: CSSOptions = {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist(browserslist.loadConfig({
          path: await resolvePath('~/')
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
