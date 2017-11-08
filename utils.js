function sendJSON(response, json) {
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(json))
}

module.exports = {
  sendJSON
}