// const http = require('node:http')
// const dittoJSON = require('../pokemon/ditto.json')

// const port = process.env.PORT ?? 1234

// const processRequest = (req, res) => {
//   const { method, url } = req

//   switch (method) {
//     case 'GET':
//       switch (url) {
//         case '/':
//           res.setHeader('Content-type', 'text/html; charset=utf-8')
//           res.end('<h1>Página de início</h1>')
//           break
//         case '/pokemon/ditto':
//           res.setHeader('Content-type', 'application/json; charset=utf-8')
//           res.end(JSON.stringify(dittoJSON))
//           break
//         default:
//           res.statusCode = 404
//           res.setHeader('Content-type', 'text/html; charset=utf-8')
//           res.end('<h1>404 Not Found</h1>')
//       }
//       break
//     case 'POST':
//       switch (url) {
//         case '/pokemon': {
//           let body = ''
//           req.on('data', chunk => {
//             body += chunk.toString()
//           })
//           req.on('end', () => {
//             const data = JSON.parse(body)
//             res.writeHead('201', { 'Content-Type': 'application/json; charset=utf-8' })
//             res.end(JSON.stringify(data))
//           })
//           break
//         }

//         default:
//           res.statusCode = 404
//           res.setHeader('Content-type', 'text/html; charset=utf-8')
//           res.end('<h1>404 Not Found</h1>')
//           break
//       }
//       break

//     default:
//       res.statusCode = 500
//       res.setHeader('Content-type', 'text/html; charset=utf-8')
//       res.end('<h1>500 Internal Server Error</h1>')
//       break
//   }
// }

// const server = http.createServer(processRequest)

// server.listen(port, () => {
//   console.log(`Servidor escuchando  en puerto : http://localhost:${port}`)
// })
