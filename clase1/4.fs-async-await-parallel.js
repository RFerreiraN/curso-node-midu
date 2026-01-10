// Lee varios archivos en paralelo usando Promise.all.
// Se ejecuta el .then() cuando todos los archivos han sido leídos correctamente.

const { readFile } = require('node:fs/promises')

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8'),
  readFile('./archivo3.txt', 'utf-8')
]).then(([text, secondText, thirdText]) => {
  console.log('Este es el primer comentario: ', text)
  console.log('Este es el segundo comentario: ', secondText)
  console.log('Este es el tercer comentario: ', thirdText)
})
