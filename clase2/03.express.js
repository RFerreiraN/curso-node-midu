const express = require('express')

const app = express()

const port = process.env.PORT ?? 1234

app.get('/', (req, res) => {
  console.log('Request recibida')
  res.status(200).send('<h1>Página de início</h1>')
})

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto: http://localhost:${port}`)
})
