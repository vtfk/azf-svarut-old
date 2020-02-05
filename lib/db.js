const mongoose = require('mongoose')
const letterSchema = require('./schema/letter')

function mongoInit () {
  if (!process.env.COSMOS_CONNECTION) throw Error('Missing required env: COSMOS_CONNECTION')
  if (!process.env.COSMOS_COLLECTION) throw Error('Missing required env: COSMOS_COLLECTION')

  async function connect () {
    const connection = await mongoose.connect(process.env.COSMOS_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    return connection.model('letter', letterSchema, process.env.COSMOS_COLLECTION)
  }

  return {
    findDocuments: (condition) => findDocuments(connect, condition),
    insertDocument: (document) => insertDocument(connect, document),
    updateDocuments: (condition, document) => updateDocuments(connect, condition, document),
    deleteOneDocument: (condition) => deleteOneDocument(connect, condition)
  }
}

// TODO: Find a more async way to handle db.close()

async function findDocuments (connect, condition) {
  const model = await connect()
  const data = await model.find(condition)
  model.db.close()
  return data
}
async function insertDocument (connect, document) {
  const model = await connect()
  const data = await model.create(document)
  model.db.close()
  return data
}
async function updateDocuments (connect, condition, documents) {
  const model = await connect()
  documents = Array.isArray(documents) ? documents : [documents]
  const data = await model.updateMany(condition, documents)
  model.db.close()
  return data
}
async function deleteOneDocument (connect, condition) {
  const model = await connect()
  const data = await model.deleteOne(condition)
  model.db.close()
  return data
}

module.exports = mongoInit
