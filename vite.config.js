import { defineConfig } from 'vite'
import { buildBlog } from './build-blog.js'

// Static single page, no framework.
//
// The blog is generated into dist/ at build time, which means the dev server
// would otherwise 404 on /writing/ and silently fall back to the home page.
// This plugin generates the posts on dev start and serves them from memory, so
// the Writing link behaves the same in dev as in the build.
function blog() {
  let posts = []

  const generate = () => {
    try {
      posts = buildBlog({ write: false, css: '/src/styles.css' }) || []
    } catch (err) {
      console.warn('[blog] generate failed:', err.message)
      posts = []
    }
  }

  return {
    name: 'blog',

    configureServer(server) {
      generate()

      // Rebuild when a post changes, so edits show up on reload.
      server.watcher.add('content/blog')
      server.watcher.on('all', (_event, file) => {
        if (file.includes('content/blog')) generate()
      })

      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0]
        if (!url.startsWith('/writing')) return next()

        const slug = url.replace(/^\/writing\/?/, '').replace(/\/$/, '')
        const page = slug
          ? posts.find((p) => p.slug === slug)?.page
          : posts.index

        if (!page) return next()
        res.setHeader('Content-Type', 'text/html')
        res.end(page)
      })
    },
  }
}

export default defineConfig({
  plugins: [blog()],
  build: { target: 'es2018' },
})
