const winston = require('winston')
const {logging: {filename}} = require('config')

const log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    // new (winston.transports.File)({filename}),
  ]
})

const logError = (f) => {
  try {
    return f.apply(this, arguments)
  }
  catch (error) {
    log.error(error)
  }
}

const logErrorAsync = (f) => async (...args) => {
  try {
    return await f(...args)
  }
  catch (error) {
    log.error(error)
  }
}

const logHTTPError = (handler) => (req, res) => {
  try {
    handler(req, res)
  }
  catch (error) {
    log.error(error)
    res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

module.exports = {
  log,
  logError,
  logErrorAsync,
  logHTTPError,
}
