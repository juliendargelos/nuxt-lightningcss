import type { Plugin } from 'vite'
import { parse } from '@vue/compiler-sfc'
import MagicString from 'magic-string'

export interface GlobalStylesheetParameters {
  paths: string[]
}

export default function globalStylesheet({
  paths
}: GlobalStylesheetParameters): Plugin {
  const imports = paths
    .map(path => `@import ${JSON.stringify(path)};`)
    .join('\n')

  return {
    name: 'nuxt-lightningcss-global-stylesheet',
    enforce: 'pre',

    transform(code, id) {
      if (!id.includes('/') || id.includes('/node_modules/')) {
        return
      }

      const url = new URL(`file://${id.replace(/^[^/]+\/+/, '/')}`)
      const extension = url.pathname.replace(/^.+\.([^.]+)$/, '$1')
      const type = url.searchParams.get('type')

      if (extension === 'css' || (extension === 'vue' && type === 'style')) {
        const s = new MagicString(code)
        s.prepend(`${imports}\n`)

        return {
          map: s.generateMap({ hires: true }),
          code: s.toString()
        }
      } else if (!type && extension === 'vue') {
        const s = new MagicString(code)
        const parsed = parse(code)

        for (const style of parsed.descriptor.styles) {
          s.appendLeft(style.loc.start.offset, `\n${imports}\n`)
        }

        return {
          map: s.generateMap({ hires: true }),
          code: s.toString()
        }
      }
    }
  }
}
