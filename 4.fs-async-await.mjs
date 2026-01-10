// Módulos ES (ESM) con top-level await (Node moderno)


import { readFile } from 'node:fs/promises'


console.log('Leyendo el primer comentario...')
const text = await readFile('./archivo.txt', 'utf-8')
console.log('Este es el primer comentario: ', text)

console.log('<== Hacer cosas mientras lees el archivo...')

console.log('Leyendo el segundo comentario...')
const secondText = await readFile('./archivo2.txt', 'utf-8')
console.log('Este es el segundo comentario: ', secondText)

console.log('Leyendo el tercer archivo...')
const thirdText = await readFile('./archivo3.txt', 'utf-8')
console.log('Este es el tercer comentario: ', thirdText )