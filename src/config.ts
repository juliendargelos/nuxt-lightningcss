import type { TransformOptions, CustomAtRules } from 'lightningcss'

export type Config = Partial<Omit<TransformOptions<CustomAtRules>,
  'filename' |
  'code'
>>

export function defineConfig(config: Config): Config {
  return config
}

