const express = require('express')
const app = express()
const products = require('./products.json')
const crypto = require('node:crypto')
const { validateProducto, validateProductParcial } = require('../Schema/productsSchema')

app.disable('x-powered-by')
app.use(express.json())

const PORT = process.env.PORT ?? 2345
// Todos los productos
app.get('/products', (req, res) => {
  const { category } = req.query
  if (category) {
    const productCategory = products.filter(producto => producto.category.toLowerCase() === category.toLowerCase())
    return res.json(productCategory)
  }
  return res.json(products)
})

// Obtener un solo producto por su ID
app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const producto = products.filter(producto => producto.id.toString() === id)
  res.status(200).json(producto)
})

// Crear un nuevo producto

app.post('/products/', (req, res) => {
  const result = validateProducto(req.body)

  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }
  const newProduct = {
    id: crypto.randomUUID(),
    ...result.data
  }

  products.push(newProduct)
  res.status(201).json(newProduct)
})

// Modifcar parte de un producto por su ID

app.patch('/products/:id', (req, res) => {
  const result = validateProductParcial(req.body)

  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const index = products.findIndex(producto => producto.id.toString() === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Product Not Found' })
  }

  const updateProduct = {
    ...products[index],
    ...result.data
  }

  products[index] = updateProduct

  return res.json(updateProduct)
})

// Eliminar un producto por su ID
app.delete('/products/:id', (req, res) => {
  const { id } = req.params
  const index = products.findIndex(producto => producto.id.toString() === id)
  if (index === -1) {
    return res.status(404).json({ message: '404 Producto Not Found' })
  }
  return res.status(204).send()
})

app.use((req, res) => {
  res.status(404).json({ message: '404 Not Found Rute' })
})

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}/products`)
})
