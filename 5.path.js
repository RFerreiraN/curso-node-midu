const path = require('node:path')

console.log(path.sep) // => Nos permite saber como son la separación con barras en las rutas en nuestro Sistema Operativo SO

const filePath = path.join('content', 'subfolder', 'test.txt') // => Nos permite unir rutas de archivos o carpetas de una manera más sencilla y compatible con el SO
console.log(filePath)

const fileName = path.basename('/Users/mauriciopoppe/Projects/node/content/subfolder/test.txt') // => Nos permite obtener el nombre del archivo o carpeta de una ruta completa
console.log(fileName);

const extension = path.extname('/Users/mauriciopoppe/Projects/node/content/subfolder/test.txt') // => Nos permite obtener la extension del archivo (.txt o .jpg, etc)
console.log(extension)