// const fs = require('node:fs')
// const http = require('node:http')

// Definimos el puerto:
// - Usa el puerto definido en la variable de entorno PORT si existe
// - Si no, usa el 1234 por defecto
// const port = process.env.PORT ?? 1234

// Función que se ejecuta en cada petición HTTP
// const processRequest = (req, res) => {
// Establecemos el tipo de contenido por defecto (HTML con UTF-8)
// res.setHeader('Content-type', 'text/html; charset=utf-8')
// Ruta principal "/"
// if (req.url === '/') {
// res.statusCode = 200
// res.end('<h1>Bienvenido a mi página principal</h1>')
// Ruta "/imagen"
// } else if (req.url === '/imagen') {
// Leemos una imagen desde el sistema de archivos (fs)
// fs.readFile('../placa.png', (err, data) => {
// if (err) {
// res.statusCode = 500
// res.end('<h1>505 Internal Server Error</h1>')
// } else {
// res.setHeader('Content-type', 'image/png') // Cambiamos el tipo de contenido
// res.statusCode = 200
// res.end(data) // Enviamos la imagen como respuesta
// }
// })
// } else if (req.url === '/contacto') {
// res.statusCode = 200
// res.end('<h1>Página de Contacto</h1>')
// } else {
// res.statusCode = 404
// res.end('<h1>404 Not Found</h1>')
// // }
// }

// Creamos el servidor HTTP y le pasamos la función que maneja las peticiones
// const server = http.createServer(processRequest)

// Ponemos el servidor a escuchar en el puerto indicado
// server.listen(port, () => {
// console.log(`Servidor escuchando en el puerto: http://localhost:${port}`)
// })

// TODO, Cambiar los else if por switch

const http = require('node:http')
const fs = require('node:fs')

const processRequest = (req, res) => {
  switch (req.url) {
    case '/':
      res.setHeader('Content-type', 'text/html; charset=utf-8')
      res.end('Bienvenido a mi página principal')
      break
    case '/contacto':
      res.setHeader('Content-type', 'text/html; charset=utf-8')
      res.end('Página de Contacto')
      break
    case '/imagen':
      fs.readFile('../placa.png', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            res.statusCode = 404
            res.end('<h1>404 Not Found</h1>')
          } else {
            res.statusCode = 500
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
      res.end('<h1>404 Not Found</h1>')
  }
}

const server = http.createServer(processRequest)

const port = process.env.PORT ?? 1234

server.listen(port, () => {
  console.log(`Servidor escuchando en puerto : http://localhost:${port}`)
})

/*
  Este código crea un servidor HTTP básico usando Node.js que responde a diferentes rutas y sirve contenido HTML y una imagen.

  1. Se importan los módulos necesarios: (CommonJs)
     - 'http' para crear el servidor.
     - 'fs' para interactuar con el sistema de archivos y leer archivos como la imagen.

  2. Se define la función processRequest que maneja todas las peticiones al servidor:
     - Recibe 'req' (request) y 'res' (response) como parámetros.
     - Se analiza 'req.url' mediante un switch para decidir la acción según la ruta solicitada.

  3. Rutas definidas:
     - '/' → Se envía un mensaje de bienvenida como HTML.
     - '/contacto' → Se envía un mensaje de contacto como HTML.
     - '/imagen' → Se intenta leer el archivo '../placa.png':
         • Si ocurre un error y el código es ENOENT (archivo no encontrado), se responde con un 404.
         • Si ocurre otro tipo de error, se responde con un 500.
         • Si se lee correctamente, se responde con la imagen y se ajusta el header 'Content-type' a 'image/png'.
     - default → Para cualquier otra ruta no definida, se responde con un 404.

  4. Se crea el servidor HTTP con http.createServer pasando la función processRequest como callback.

  5. Se define el puerto en el que escuchará el servidor:
     - Primero se revisa process.env.PORT, si no existe se usa 1234 como valor por defecto.

  6. Se inicia el servidor con server.listen en el puerto definido:
     - Al iniciar, se imprime en consola la URL local donde se puede acceder al servidor.

  En resumen, este código:
    - Crea un servidor HTTP.
    - Maneja rutas específicas y devuelve contenido HTML o imágenes.
    - Implementa manejo de errores básico para archivos no encontrados y errores internos.
    - Permite configurar el puerto mediante variables de entorno.
*/
