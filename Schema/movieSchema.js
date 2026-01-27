const z = require('zod')

const SchemaMovie = z.object({
  title: z.string(),
  director: z.string(),
  year: z.number().int().min(1900).max(2026),
  duration: z.number().positive().int(),
  poster: z.url(),
  rate: z.number().min(0).max(10).default(2.5),
  genre: z.array(
    z.enum(['Action', 'Crime', 'Drama', 'Adventure', 'Sci-fi', 'Romance', 'Animation', 'Biography', 'Fantasy'])
  )
})

function validateMovie(object) {
  return SchemaMovie.safeParse(object)
}

function validateMoviePartial(object) {
  return SchemaMovie.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validateMoviePartial
}
