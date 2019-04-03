
const app = require('./src/config/server')

require('./src/app/routes')(app)

app.listen('3000', () => {
  console.log('Server listening on port 3000.')
})
