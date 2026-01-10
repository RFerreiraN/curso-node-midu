const http = require('node:http')

const server = http.createServer((req, res) => {
  console.log('Request recibida')
  res.end('Hola mundo')
})

server.listen(0, () => {
  console.log(`Servidor corriendo en puerto numero: http://localhost:${server.address().port}`)
})
