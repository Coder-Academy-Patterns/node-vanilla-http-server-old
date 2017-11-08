function sendJSON(response, json, status = 200) {
  response.writeHead(status, {
    'Content-Type': 'application/json'
  })
  response.end(JSON.stringify(json))
}

function readBodyAsJSON(request, callback) {
  const contentType = request.headers['content-type']
  if (contentType !== 'application/json') {
    callback(new Error(`Content type must be 'application/json' not ${contentType}`))
    return
  }

  let body = ''

  request.on('data', (chunk) => {
    body += chunk
  })

  request.on('end', () => {
    try {
      const json = JSON.parse(body)
      callback(null, json)
    }
    catch (error) {
      callback(error)
    }
  })
}

module.exports = {
  sendJSON,
  readBodyAsJSON
}