import type { TransformOptions, CustomAtRules } from 'lightningcss'

export type Config = Partial<Omit<
  TransformOptions<CustomAtRules>,
  'filename' |
  'code' |
  'sourceMap' |
  'inputSourceMap' |
  'projectRoot' |
  'analyzeDependencies' |
  'cssModules'
>>

export function defineConfig(config: Config): Config {
  return config
}

