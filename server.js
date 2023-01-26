const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
// path.join(__dirname, 'data.json')
const router = jsonServer.router("data.json")
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})