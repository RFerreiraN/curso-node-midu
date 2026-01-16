const express = require('express')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.get('/movies', (req, res) => {
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.status(201).json(movie)
  res.status(404).json({ message: 'Movie Not Found' })
})

app.use((req, res) => {
  res.status(404).json({ message: '404 Not Found' })
})

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})
