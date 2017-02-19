const {datastore} = require('google-cloud') // Google Datastore
const {db: {keyFilename}, projectId} = require('config')

const db = datastore({
  projectId,
  keyFilename,
})

const {get, save, runQuery, key, createQuery} = db

// For key get queries
const access = (result) => {
  if (!result) return null
  let data = result.data
  if (Array.isArray(data)) data = reduce(data)
  data.id = result.key.id
  return data
}

// For filter queries meant to only return one item
const accessOne = (results) => {
  if (!results[0]) return null
  let data = results[0].data
  if (Array.isArray(data)) data = reduce(data)
  data.id = results[0].key.id
  return data
}

// For filter queries meant to return many items
const accessMany = (results) => results.map(result => {
  let {data, key} = result
  if (Array.isArray(data)) data = reduce(data)
  data.id = key.id
  return data
})

module.exports = {
  db,
  get,
  save,
  createKey: key,
  runQuery,
  createQuery,
  access,
  accessOne,
  accessMany,
}
