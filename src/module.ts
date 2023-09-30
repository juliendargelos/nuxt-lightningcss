import { defineNuxtModule, resolvePath } from '@nuxt/kit'
import { type TransformOptions, browserslistToTargets, CustomAtRules } from 'lightningcss'
import { type CSSOptions } from 'vite'
import browserslist from 'browserslist'

import globalCSSImports from './plugins/global-css-imports'

export interface LightningCSSOptions extends Partial<Omit<
  TransformOptions<CustomAtRules>,
  'filename' |
  'code' |
  'sourceMap' |
  'inputSourceMap' |
  'projectRoot' |
  'analyzeDependencies' |
  'cssModules'
>> {
  globals?: string[]
}

export default defineNuxtModule<LightningCSSOptions>({
   meta: {
    name: 'lightningcss',
    configKey: 'lightningcss'
  },

  defaults: {
    minify: true
  },

  async setup({
    globals,
    minify = true,
    ...options
  }, nuxt): Promise<void> {
    const cssOptions: CSSOptions = {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist(browserslist.loadConfig({
          path: await resolvePath('~/')
        }))),
        ...options
      } as any
    }

    const plugins = !globals || !globals.length ? [] : [globalCSSImports({
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
