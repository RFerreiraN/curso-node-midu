const express = require('express')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const movieGenre = movies.filter(
      movie => movie.genre.some(genero => genero.toLowerCase() === genre.toLowerCase())
    )
    return res.json(movieGenre)
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

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieDelete = movies.filter(movie => movie.id === id)
  if (movieDelete) {
    return res.json({ message: 'Movie Delete' })
  } else {
    return res.status(500).json({ message: '500 Error Internal Server' })
  }
})

app.use((req, res) => {
  res.status(404).json({ message: '404 Not Found' })
})

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}/movies`)
})
