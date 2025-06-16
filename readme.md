# nuxt-lightningcss

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Use the built-in lightningcss preprocessor of Vite with Nuxt.

- [📖 &nbsp;Lightningcss documentation][lightningcss-documentation]
- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Quick Setup

1. Add `nuxt-lightningcss` dependency to your project

```bash
pnpm add -D nuxt-lightningcss
```

2. Add `nuxt-lightningcss` to the `modules` section of `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  modules: [
    'nuxt-lightningcss'
  ]
})
```

That's it! You can now use lightningcss in your Nuxt app ✨

## Configuration

To configure the module, add an options object either with the `lightningcss` key or in the `modules` array:

```typescript
export default defineNuxtConfig({
  modules: [
    'nuxt-lightningcss'
  ],

  lightningcss: {
    // Options
  }
})
```

```typescript
export default defineNuxtConfig({
  modules: [
    ['nuxt-lightningcss', {
      // Options
    }]
  ]
})
```


```typescript
interface ModuleOptions {
  /**
   * Paths to global stylesheets
   * @default undefined
   */
  globals?: string[]

  /**
   * Wether to minify stylesheets
   * @default true
   */
  minify?: boolean

  /**
   * Lightningcss configuration file or object
   * @default '~~/lightningcss.config.ts'
   */
  config?: string | Config
}
```

- `globals`: an array of stylesheet paths to import in all other stylesheets. This is especially useful when you want to transpile [custom media queries](#custom-media-queries).
- `minify`: set to false to disable lightningcss minification (always disabled in development mode)
- `config`: lightningcss [configuration](src/config.ts) file or object. By default, the module will look for a `lightningcss.config.ts` file in the root of your project.

### Configuration file

You can create a separate file to define lightningcss
[configuration][lightningcss-options]:

```typescript
// ~~/lightningcss.config.ts

import { defineLightningCSSConfig } from 'nuxt-lightningcss'

export default defineLightningCSSConfig({
  // Lightningcss configuration
})
```


### Targets

The [lightningcss `targets` option][lightningcss-targets] is automatically set from you project [browserslist configuration][browserslist-readme] (either in `.browserslistrc`, `browserslist`, `package.json` or in the `BROWSERSLIST` environment variable). If there isn't an explicit browserslist configuration in your project, the `defaults` preset will be used. This can also be overridden from the lightningcss configuration:

```typescript
import { defineLightningCSSConfig } from 'nuxt-lightningcss'
import { browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'

export default defineLightningCSSConfig({
  targets: browserslistToTargets(browserslist('> 0.5%, last 2 versions, Firefox ESR, not dead'))
})
```

### Custom media queries

Custom media queries can be transpiled using lightningcss, but since their actual definition is removed from the bundled stylesheets, they need to be imported in all stylesheets that use them. You can do that using the following configuration:

```typescript
import { Features } from 'lightningcss'

export default defineNuxtConfig({
  modules: [
    'nuxt-lightningcss'
  ],

  lightningcss: {
    globals: [
      // Import your custom media queries in all stylesheets
      '~/assets/stylesheets/media-queries.css'
    ],
    config: {
      include: Features.CustomMediaQueries,
      drafts: {
        customMedia: true
      }
    }
  }
})
```

### Minify

By default, stylesheets are minified in production using lightningcss. You can disable minification using the following configuration (always disabled in development mode):

```typescript
import { Features } from 'lightningcss'

export default defineNuxtConfig({
  modules: [
    'nuxt-lightningcss'
  ],

  lightningcss: {
    minify: false
  }
})
```

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm dev:prepare

# Develop with the playground
pnpm dev

# Build the playground
pnpm dev:build

# Run ESLint
pnpm lint

# Run Vitest
pnpm test
pnpm test:watch

# Release new version
pnpm release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-lightningcss/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-lightningcss

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-lightningcss.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-lightningcss

[license-src]: https://img.shields.io/npm/l/nuxt-lightningcss.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-lightningcss

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com

<!-- Lightningcss documentation -->
[lightningcss-documentation]: https://lightningcss.dev/docs.html
[lightningcss-targets]: https://lightningcss.dev/transpilation.html#browser-targets
[lightningcss-options]: https://github.com/parcel-bundler/lightningcss/blob/7ff93ca5c69ba9df415e1e2319d275e2cec249d7/node/index.d.ts#L8-L74
[browserslist-readme]: https://github.com/browserslist/browserslist#readme
