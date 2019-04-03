
const app = require('./config/server')

require('./app/routes')(app)

app.listen('3000', () => {
  console.log('Server listening on port 3000.')
})
