const http = require('http')

const server = http.createServer((req, res) => {
  res.end(`<h1>You will never win!</h1>`)
})

server.listen(3000, () => {
  console.log('Server listening on port 3000.')
})
