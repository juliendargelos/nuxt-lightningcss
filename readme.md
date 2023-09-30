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
# Using pnpm
pnpm add -D nuxt-lightningcss

# Using yarn
yarn add --dev nuxt-lightningcss

# Using npm
npm install --save-dev nuxt-lightningcss
```

2. Add `nuxt-lightningcss` to the `modules` section of `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  modules: [
    'nuxt-lightningcss'
  ]
})
```

3. To get the proper syntax highlighting in your components, use `lang="postcss"` in your style tags:

```html
<style lang="postcss">
  .a {
    color: black;

    .b {
      color: blue;
    }
  }
</style>
```

That's it! You can now use lightningcss in your Nuxt app ✨

## Configuration

To configure lightningcss, add an options object either with the `lightningcss` key or in the `modules` array:

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

This module takes the same options as those from the [lightningcss transform function][lightningcss-options], except for the following:

- `code`
- `filename`
- `projectRoot`
- `analyzeDependencies`
- `sourceMap`
- `inputSourceMap`
- `cssModules`

It also provides these extra options:

- `globals`: an array of stylesheet paths to import in all other stylesheets. This is especially useful when you want to transpile [custom media queries](#custom-media-queries).

### Targets

The [lightningcss `targets` option][lightningcss-targets] is automatically set from you project [browserslist configuration][browserslist-readme] (either in `.browserslistrc`, `browserslist`, `package.json` or in the `BROWSERSLIST` environment variable). If there isn't an explicit browserslist configuration in your project, the `defaults` preset will be used. This can also be overridden from the module options:

```typescript
import { browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'

export default defineNuxtConfig({
  modules: [
    'nuxt-lightningcss'
  ],

  lightningcss: {
    targets: browserslistToTargets(browserslist('> 0.5%, last 2 versions, Firefox ESR, not dead'))
  }
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
    include: Features.CustomMediaQueries,
    drafts: {
      customMedia: true
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
yarn install

# Generate type stubs
yarn dev:prepare

# Develop with the playground
yarn dev

# Build the playground
yarn dev:build

# Run ESLint
yarn lint

# Run Vitest
yarn test
yarn test:watch

# Release new version
yarn release
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
