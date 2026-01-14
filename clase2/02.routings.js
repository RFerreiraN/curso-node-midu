const http = require('node:http')
const fs = require('node:fs')
const dittoJSON = require('../pokemon/ditto.json')

const port = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/':
          res.setHeader('Content-type', 'text/html; charset=utf-8')
          res.end('<h1>Página de início</h1>')
          break
        case '/pokemon/ditto':
          res.setHeader('Content-type', 'application/json; charset=utf-8')
          res.end(JSON.stringify(dittoJSON))
          break
        case '/imagen':
          fs.readFile('../placa.png', (err, data) => {
            if (err) {
              if (err.code === 'ENOENT') {
                res.statusCode = 404
                res.setHeader('Content-type', 'text/html; charset=utf-8')
                res.end('<h1>404 Not Found</h1>')
              } else {
                res.statusCode = 500
                res.setHeader('Content-type', 'text/html; charset=utf-8')
                res.end('<h1>500 Internal Server Error</h1>')
              }
            }
            res.statusCode = 200
            res.setHeader('Content-type', 'image/png')
            res.end(data)
          })
          break
        default:
          res.statusCode = 404
          res.setHeader('Content-type', 'text/html; charset=utf-8')
          res.end('<h1>404 Not Found</h1>')
          break
      }
      break
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead('201', { 'Content-type': 'application/json' })
            res.end(JSON.stringify(data))
          })
        }
          break
        default:
          res.statusCode = 500
          res.setHeader('Content-type', 'text/html; charset=utf-8')
          res.end('<h1>500 Internal Server Error</h1>')
          break
      }
      break
    case 'PUT':
      switch (url) {
        case '/pokemon': {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead('201', { 'Content-type': 'application/json' })
            res.end(JSON.stringify(data))
          })
        }
          break
        default:
          res.statusCode = 500
          res.setHeader('Content-type', 'text/html; charset=utf-8')
          res.end('<h1>500 Internal Server Error</h1>')
          break
      }
      break
    default:
      res.statusCode = 404
      res.setHeader('Content-type', 'text/html; charset=utf-8')
      res.end('<h1>404 Not Found</h1>')
      break
  }
}

const server = http.createServer(processRequest)

server.listen(port, () => {
  console.log(`Servidor escuchando en puerto: http://localhost:${port}`)
})

/*
EXPLICACIÓN DEL FUNCIONAMIENTO DEL SERVIDOR

1. Se importan los módulos nativos de Node.js:
   - http: para crear el servidor HTTP.
   - fs: para leer archivos del sistema de ficheros.
   - ditto.json: archivo JSON que se devolverá como respuesta en una ruta concreta.

2. Se define el puerto del servidor:
   - Usa la variable de entorno PORT si existe.
   - En caso contrario, utiliza el puerto 1234 por defecto.

3. Se define la función processRequest(req, res):
   - Esta función se ejecuta cada vez que el servidor recibe una petición HTTP.
   - Se extraen el método HTTP (GET, POST, PUT, etc.) y la URL desde el objeto req.

4. Se evalúa el método HTTP mediante un switch principal:

   ======================
   MÉTODO GET
   ======================

   - Ruta '/':
     Devuelve una respuesta HTML simple como página de inicio.

   - Ruta '/pokemon/ditto':
     Devuelve el contenido del archivo ditto.json en formato JSON.

   - Ruta '/imagen':
     Intenta leer una imagen PNG desde el sistema de archivos.
       • Si el archivo no existe (ENOENT), responde con un error 404.
       • Si ocurre cualquier otro error, responde con un error 500.
       • Si la lectura es correcta, devuelve la imagen con el Content-Type adecuado.

   - Cualquier otra ruta GET:
     Responde con un error 404 (Not Found).

   ======================
   MÉTODO POST
   ======================

   - Ruta '/pokemon':
     • Se inicializa una variable body para almacenar el cuerpo de la petición.
     • Se escuchan los eventos 'data' para recibir los datos en fragmentos (chunks).
     • Cuando finaliza el stream ('end'), el body completo se convierte de JSON a un objeto JavaScript.
     • Se responde con un código 201 (Created) y se devuelve el mismo JSON recibido.

   - Cualquier otra ruta POST:
     Responde con un error 500.

   ======================
   MÉTODO PUT
   ======================

   - Ruta '/pokemon':
     • Funciona de forma similar al método POST.
     • Se recibe el body como stream mediante los eventos 'data' y 'end'.
     • El contenido se parsea desde JSON a un objeto JavaScript.
     • Se responde con un código 201 y se devuelve el JSON recibido.
     • En un contexto real, este método se usaría para actualizar un recurso existente.

   - Cualquier otra ruta PUT:
     Responde con un error 500.

5. Si el método HTTP no es GET, POST ni PUT:
   - Se responde con un error 404.

6. Se crea el servidor HTTP usando http.createServer, pasando la función processRequest
   como manejador de las peticiones.

7. El servidor comienza a escuchar en el puerto definido y muestra un mensaje en consola
   indicando la URL donde está disponible.

Este código implementa un servidor HTTP básico en Node.js nativo, manejando rutas,
métodos HTTP, lectura de archivos, streams, JSON y códigos de estado, sin utilizar
frameworks como Express, lo que permite entender cómo funciona el backend a bajo nivel.
*/
