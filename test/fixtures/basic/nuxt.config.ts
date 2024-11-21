import lightningcss from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    lightningcss
  ],

  css: [
    '~/stylesheets/index.css'
  ],

  lightningcss: {
    globals: [
      '~/stylesheets/media-queries.css'
    ]
  }
})
