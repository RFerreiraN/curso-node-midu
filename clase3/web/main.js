function movies() {
  fetch('http://localhost:1234/movies')
    .then(res => res.json())
    .then(movies => {
      const html = movies.map(movie => {
        return `
          <article data-id="${movie.id}" class="card">
            <h2>${movie.title}</h2>
            <img src="${movie.poster}"
            <h3>${movie.year}</h3>
            
          <button>Eliminar</button>
          </article>
        `
      }).join('')

      document.querySelector('main').innerHTML = html
      document.addEventListener('click', e => {
        if (e.target.matches('button')) {
          const article = e.target.closest('article')
          const id = article.dataset.id
          console.log(id)

          fetch(`http://localhost:1234/movies/${id}`, {
            method: 'DELETE'
          })
            .then(res => {
              if (res.ok) {
                article.remove()
              }
            })
        }
      })
    })
}

movies()
