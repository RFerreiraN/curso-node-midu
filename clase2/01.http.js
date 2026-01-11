const fs = require('node:fs')
const http = require('node:http')

// Definimos el puerto:
// - Usa el puerto definido en la variable de entorno PORT si existe
// - Si no, usa el 1234 por defecto
const port = process.env.PORT ?? 1234

// Función que se ejecuta en cada petición HTTP
const processRequest = (req, res) => {
  // Establecemos el tipo de contenido por defecto (HTML con UTF-8)
  res.setHeader('Content-type', 'text/html; charset=utf-8')
  // Ruta principal "/"
  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h1>Bienvenido a mi página principal</h1>')
    // Ruta "/imagen"
  } else if (req.url === '/imagen') {
    // Leemos una imagen desde el sistema de archivos (fs)
    fs.readFile('../placa.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>505 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-type', 'image/png') // Cambiamos el tipo de contenido
        res.statusCode = 200
        res.end(data) // Enviamos la imagen como respuesta
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('<h1>Página de Contacto</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>404 Not Found</h1>')
  }
}

// Creamos el servidor HTTP y le pasamos la función que maneja las peticiones
const server = http.createServer(processRequest)

// Ponemos el servidor a escuchar en el puerto indicado
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto: http://localhost:${port}`)
})
