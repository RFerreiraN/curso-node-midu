// Forma CommonJS usando async/await con fs/promises (válida y actual)


const { readFile } = require('node:fs/promises');

(
  async () => {
    console.log('Leyendo el primer archivo...')
    const text = await readFile('./archivo.txt', 'utf-8')
    console.log('Este es el primer comentario: ', text)

    console.log('Hacer cosas mientras lee el archivo...')

    console.log('Leyendo el segundo comentario')
    const secondText = await readFile('./archivo2.txt', 'utf-8')
    console.log('Este es el segundo comentario: ', secondText)

    console.log('Leyendo el tercer comentario...')
    const thirdText = await readFile('./archivo3.txt', 'utf-8')
    console.log('Este es el tercer comentario: ', thirdText)

  })()

