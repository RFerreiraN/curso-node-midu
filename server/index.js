const express = require('express')
const app = express()
const products = require('./products.json')

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000
// Todos los productos
app.get('/products', (req, res) => {
  const { category } = req.query
  if (category) {
    const productCategory = products.filter(producto => producto.category.toLowerCase() === category.toLowerCase())
    res.json(productCategory)
  }
  res.json(products)
})

// Obtener un solo producto por su ID
app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const producto = products.filter(producto => producto.id === Number(id))
  res.status(200).json(producto)
})

// Eliminar un producto por su ID
app.delete('/products/:id', (req, res) => {
  const { id } = req.params
  const index = products.findIndex(producto => producto.id === Number(id))
  if (index === -1) {
    return res.status(404).json({ message: '404 Producto Not Found' })
  }
  products.splice(index, 1)
  return res.status(204).json(index)
})

app.use((req, res) => {
  res.status(404).json({ message: '404 Not Found Rute' })
})

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}/products`)
})
