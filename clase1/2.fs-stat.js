const fs = require('node:fs')

// Obtener información (metadatos) de un archivo o directorio.

const stats = fs.statSync('./archivo.txt')

console.log(
  stats.isFile(), // es un fichero?
  stats.isDirectory(), // es un directorio?
  stats.isSymbolicLink(), // es un enlace simbólico
  stats.size // tamaño en bytes
)
