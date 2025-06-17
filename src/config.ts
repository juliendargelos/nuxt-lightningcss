import type { CustomAtRules, BundleAsyncOptions } from 'lightningcss'

export type Config = Omit<BundleAsyncOptions<CustomAtRules>,
  | 'filename'
  | 'resolver'
  | 'minify'
  | 'sourceMap'
  | 'analyzeDependencies'
  | 'inputSourceMap'
  | 'projectRoot'
>

export function defineConfig(config: Config): Config {
  return config
}

