const fs = require('node:fs')
const path = require('node:path')

// readdir lee el contenido del directorio actual (.) y ejecuta un callback.
// El callback recibe un error (si ocurre) y un array de strings con los nombres de los archivos.

fs.readdir('.', (err, files) => {
  if (err) {
    console.error('Ha ocurrido un error: ', err) // manejo de errores
    return
  }

  // Usamos map para transformar el array de nombres de archivos
  // en un nuevo array que contiene solo sus extensiones
  const extension = files.map(file => {
    return path.extname(file)
  })

  const arrayJS = []
  const arrayMJS = []
  const arrayTXT = []

  // Recorremos el array de extensiones y clasificamos cada una
  // usando un switch para guardarlas en distintos arrays
  extension.forEach((ext, index) => {
    switch (ext) {
      case '.js':
        arrayJS.push(ext, index)
        break
      case '.mjs':
        arrayMJS.push(ext, index)
        break
      case '.txt':
        arrayTXT.push(ext, index)
        break

      default:
        break
    }
  })

  console.log(arrayJS)
  console.log(arrayMJS)
  console.log(arrayTXT)
})
