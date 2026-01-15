const express = require('express')
const dittoJSON = require('../pokemon/ditto.json')
const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    req.body = data
    next()
  })
})

app.get('/', (req, res) => {
  res.send('<h1>Página de inicio</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

app.put('/pokemon', (req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const data = JSON.parse(body)
    res.send(data)
  })
})

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto: http://localhost:${PORT}`)
})

/*
EXPLICACIÓN DEL FUNCIONAMIENTO DEL SERVIDOR EXPRESS

1. Se importa Express y el JSON de Ditto:
   - `express` → framework web para Node.js.
   - `dittoJSON` → archivo JSON que se devolverá en la ruta correspondiente.

2. Se define el puerto del servidor:
   - `process.env.PORT` si existe
   - Si no, se usa `1234` como valor por defecto.

3. Se crea la instancia de Express:
   - `const app = express()`
   - Se desactiva el header `X-Powered-By` por seguridad con `app.disable('x-powered-by')`.

4. Middleware manual para parsear JSON en POST:
   - Solo se ejecuta si `req.method === 'POST'` y `Content-Type === 'application/json'`.
   - Escucha los eventos `data` y `end` del request para leer el body como stream.
   - Une todos los chunks en un string y lo parsea con `JSON.parse`.
   - El resultado se guarda en `req.body`.
   - Nota: Este middleware **equivale a lo que hace `express.json()`**, que es la forma estándar de Express para parsear JSON automáticamente.
   - Llama a `next()` para continuar con las rutas.

5. Rutas definidas:

   - **GET '/'**:
     - Devuelve un HTML simple con `<h1>Página de inicio</h1>`.

   - **GET '/pokemon/ditto'**:
     - Devuelve el contenido del JSON `dittoJSON` en formato JSON.
     - Usa `res.json()` que establece automáticamente el Content-Type a `application/json`.

   - **POST '/pokemon'**:
     - Devuelve en JSON el contenido del body que el cliente envió.
     - Responde con status `201 Created`.

   - **PUT '/pokemon'**:
     - Lee manualmente el body del request como stream (`data` y `end`), lo parsea a JSON y lo devuelve.
     - Nota: Esta ruta funciona igual que POST, pero se usa para actualizar datos.

6. Middleware final para rutas no encontradas:
   - `app.use((req, res) => { ... })`
   - Captura cualquier petición que no coincida con las rutas anteriores.
   - Devuelve un HTML con status 404: `<h1>404 Not Found</h1>`.

7. Inicialización del servidor:
   - `app.listen(PORT, …)` inicia el servidor en el puerto definido.
   - Muestra en consola un mensaje con la URL donde está escuchando.

---

RESUMEN:

- Este servidor implementa un **mini-API REST** usando Express nativo.
- Maneja métodos HTTP: GET, POST, PUT.
- Se utiliza un **middleware manual para parsear JSON** (equivalente a `express.json()`), que transforma el body en `req.body`.
- Todas las rutas que no coinciden devuelven un error 404.
- Las respuestas se envían con los códigos HTTP apropiados: 200 por defecto, 201 para POST.
- Este enfoque permite entender **cómo Node y Express manejan streams, headers y JSON** antes de usar los atajos que ofrece Express.
*/

// crear middleware para el put
