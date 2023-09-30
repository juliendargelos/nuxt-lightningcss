import { Features } from 'lightningcss'
import MyModule from '../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule
  ],

  css: [
    '~/stylesheets/index.css'
  ],

  lightningcss: {
    globals: [
      '~/stylesheets/media-queries.css'
    ],
    include: Features.CustomMediaQueries | Features.Nesting,
    drafts: {
      customMedia: true
    }
  }
})
