const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validateMovie } = require('../Schema/movieSchema')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

const PORT = process.env.PORT ?? 1234

app.get('/movies', (req, res) => {
  const { genre, year } = req.query
  if (genre) {
    const movieGenre = movies.filter(
      movie => movie.genre.some(generero => generero.toLowerCase() === genre.toLowerCase())
    )
    return res.json(movieGenre)
  }

  if (year) {
    const releaseYear = movies.filter(
      movie => movie.year === Number(year)
    )
    return res.json(releaseYear)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) {
    return res.status(200).json(movie)
  } else {
    return res.status(404).json({ message: '404 Movie Not Found' })
  }
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)
  return res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const index = movies.findIndex(movie => movie.id === id)

  if (index === -1) {
    return res.status(404).json({ message: '404 Movie Not found' })
  }
  movies.splice(index, 1)
  return res.status(204).json({ message: 'Movie deleted' })
})

app.use((req, res) => {
  res.status(404).json({ message: '404 Not Found' })
})

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}/movies`)
})
