require('source-map-support').install()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const {server: {port}} = require('config')

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(morgan('short'))
app.use(bodyParser.json())

// Libs
const {log, logErrorAsync} = require('./lib/log')

// Endpoints
const user = require('./user')

const main = () => {
  app.post('/user', user.post)
  app.listen(port, () => log.info(`Server now serving on port ${port}`))
}

main()
