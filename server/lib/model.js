const {db: {namespace}} = require('config')
const {log, logErrorAsync} = require('./log')
const {db, createKey} = require('./datastore')

module.exports.saveEntity = async (model, data, id) => {
  const path = id ? [model, id] : [model]

  const key = createKey({
    namespace,
    path,
  })

  return await logErrorAsync(async () => {
    await db.save({key, data})
    return Object.assign({}, data, {id: key.id})
  })()
}
