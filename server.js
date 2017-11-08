const HTTP = require('http')

const server = HTTP.createServer((request, response) => {
  console.log('path', request.url)
  const path = request.url
  if (path === '/') {
    response.end('THIS IS THE ROOT')
  }
  else if (path === '/random') {
    response.end(`${Math.random()}`)
  }
  else if (path === '/movies') {
    const movies = [
      {
        title: 'Forest Gump',
        year: 1994
      },
      {
        title: 'Back to the Future',
        year: 1985
      }
    ]

    response.writeHead(200, {
      'Content-Type': 'application/json'
    })

    const moviesJSON = JSON.stringify(movies)
    response.end(moviesJSON)
  }
  else {
    response.writeHead(404, {})
    response.end(`The route '${path}' does not exist`)
  }
})

const port = parseInt(process.env.PORT || 7000, 10)
server.listen(port)
