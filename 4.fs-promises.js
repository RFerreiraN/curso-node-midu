// Uso de promesas con .then() y fs/promises (sin async/await)

const fs = require('node:fs/promises');

console.log('Leyendo el Primer Archivo...')
fs.readFile('./archivo.txt', 'utf-8')
  .then(text => {
    console.log('Este es el primer texto: ',text)
  })

console.log('Hacer cosas mientras lee el archivo')

console.log('Leyendo el Segundo Archivo...')
fs.readFile('./archivo2.txt', 'utf-8')
  .then( text => {
    console.log('Este es el segundo texto: ',text)
  }) 

fs.readFile('./archivo3.txt', 'utf-8')
  .then( text => {
    console.log('Este es el tercer comentario: ', text)
  })