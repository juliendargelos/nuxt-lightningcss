import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'

const OUTPUT = '.a{color:#00f}.a .b{color:#000}@media screen and (min-width:1200px){.a{color:#ff0}}'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain(`<style>${OUTPUT}</style>`)
  })
})
