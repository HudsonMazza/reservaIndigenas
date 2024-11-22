const bodyParser = require('body-parser')
 
const usuario = require('./indigenasRoute')
const auth = require('./authRoute')

module.exports = app => {
  app.use(
    bodyParser.json(),
    usuario,
    auth
  )
}
