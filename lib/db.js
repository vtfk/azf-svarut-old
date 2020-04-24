const mongoose = require('mongoose')
const letterSchema = require('./schema/letter')
const { logger } = require('@vtfk/logger')

// TODO: Test in Azure if this gets called when function is stopping
process.on('exit', async exitCode => {
  logger('info', ['db', 'Exit event received', 'disconnecting DB', 'Exit code', exitCode])
  await mongoose.disconnect()
})

function mongoInit () {
  if (!process.env.COSMOS_CONNECTION) throw Error('Missing required env: COSMOS_CONNECTION')
  if (!process.env.COSMOS_COLLECTION) throw Error('Missing required env: COSMOS_COLLECTION')

  let mongoConnection
  async function connect () {
    if (!mongoConnection) {
      logger('info', ['db', 'Creating new DB connection'])
      mongoConnection = await mongoose.connect(process.env.COSMOS_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
    }
    return mongoConnection.model('letter', letterSchema, process.env.COSMOS_COLLECTION)
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
  return data
}
async function insertDocument (connect, document) {
  const model = await connect()
  const data = await model.create(document)
  return data
}
async function updateDocuments (connect, condition, documents) {
  if (!condition || condition === {}) logger('warn', ['db', 'updateDocuments', 'argument "condition" is undefined or equals {}'])
  const model = await connect()
  documents = Array.isArray(documents) ? documents : [documents]
  const data = await model.updateMany(condition, documents)
  return data
}
async function deleteOneDocument (connect, condition) {
  if (!condition || condition === {}) logger('warn', ['db', 'deleteOneDocument', 'argument "condition" is undefined or equals {}'])
  const model = await connect()
  const data = await model.deleteOne(condition)
  return data
}

module.exports = mongoInit
