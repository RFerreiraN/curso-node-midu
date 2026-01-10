const fs = require('node:fs/promises')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

fs.readdir(folder)
  .then( files => {
    files.forEach( file => {
      console.log(pc.cyan(file))
    })
  })

  .catch( error => {
    if( error ) {
      console.error('Ha ocurrido un error: ', error)
      return;
    }
  }) 