import { Plugin } from 'vite'

export interface GlobalCSSImportsParameters {
  paths: string[]
}

export default function globalCSSImports({
  paths
}: GlobalCSSImportsParameters): Plugin {
  const imports = paths
    .map(path => `@import ${JSON.stringify(path)};`)
    .join('\n')

  return {
    name: 'global-css-imports',
    enforce: 'pre',

    transform(code, id) {
      if (!id.includes('/') || id.includes('/node_modules/')) {
        return
      }

      const url = new URL(`file://${id.replace(/^[^/]+\/+/, '/')}`)
      const extension = url.pathname.replace(/^.+\.([^.]+)$/, '$1')
      const type = url.searchParams.get('type')

      if (extension === 'css' || (extension === 'vue' && type === 'style')) {
        return {
          map: null,
          code: `${imports}\n${code}`
        }
      } else if (!type && extension === 'vue') {
        return {
          map: null,
          code: code.replace(/(<style(?:\s+[^>]+|\s*)>)/, `$1\n${imports}\n`)
        }
      }
    }
  }
}
