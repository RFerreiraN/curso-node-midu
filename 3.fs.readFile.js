const fs = require('node:fs');

console.log('Leyendo el Primer Archivo...')
fs.readFile('./archivo.txt', 'utf-8', (error, text) => {
  console.log('Este es el primer texto: ', text)
})

console.log('Hacer cosas mientras lee el archivo')

console.log('Leyendo el Segundo Archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (error, text) => {
  console.log('Este es el segundo texto: ', text)
})