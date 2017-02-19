const {log, logError, logHTTPError} = require('./lib/log')
const {saveEntity} = require('./lib/model')

module.exports.post = logHTTPError(async (req, res) => {
  const {
    token,
    name,
  } = req.body

  const result = await saveEntity('User', {
    token,
    name,
  })

  res.status(200).json(result)
})
