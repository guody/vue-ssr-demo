const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  // 创建vue实例
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>Hello World</div>`
  })
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>      
    `)
  })
})

// 将vue实例渲染为html,在 2.5.0+，如果没有传入回调函数，则会返回 Promise
// renderer
//   .renderToString(app)
//   .then(html => {
//     console.log(html)
//   })
//   .catch(err => {
//     console.log(err)
//   })
