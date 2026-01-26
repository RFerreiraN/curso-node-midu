const z = require('zod')

const schemaRating = z.object({
  rate: z.number().positive().default(2.5),
  count: z.number().int().positive().default(100)
})

const schemaProduct = z.object({
  title: z.string(),
  price: z.number().positive(),
  description: z.string(),
  category: z.enum(["men's clothing", "women's clothing", 'jewelery', 'electronics']),
  image: z.string().url(),
  rating: schemaRating
})

function validateProducto(object) {
  return schemaProduct.safeParse(object)
}

function validateProductParcial(object) {
  return schemaProduct.partial().safeParse(object)
}

module.exports = {
  validateProducto,
  validateProductParcial
}
