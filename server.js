const HTTP = require('http')
const { sendJSON, readBodyAsJSON } = require('./utils')

let movies = [
  {
    title: 'Forest Gump',
    year: 1994
  },
  {
    title: 'Back to the Future',
    year: 1985
  }
]

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
    if (request.method === 'POST') {
      // Create
      readBodyAsJSON(request, (error, newMovie) => {
        // Error parsing JSON
        if (error) {
          sendJSON(response, {
            "error": error.message
          }, 400)
        }
        else {
          movies.push(newMovie)
          sendJSON(response, newMovie, 201)
        }
      })
    }
    else if (request.method === 'GET') {
      // Read
      sendJSON(response, movies)
    }
    else {
      // Invalid method
      response.writeHead(405) // 405 Method not allowed
    }
  }
  else {
    response.writeHead(404)
    response.end(`The route '${path}' does not exist`)
  }
})

const port = parseInt(process.env.PORT || 7000, 10)
server.listen(port)
