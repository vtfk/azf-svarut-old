const mongoose = require('mongoose')
const letterSchema = require('./schema/letter')

function mongoInit () {
  if (!process.env.COSMOS_CONNECTION) throw Error('Missing required env: COSMOS_CONNECTION')
  if (!process.env.COSMOS_COLLECTION) throw Error('Missing required env: COSMOS_COLLECTION')

  async function connect () {
    const connection = await mongoose.connect(process.env.COSMOS_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    return connection.model('letter', letterSchema, process.env.COSMOS_COLLECTION)
  }

  return {
    findDocument: (condition) => findDocument(connect, condition),
    insertDocument: (document) => insertDocument(connect, document),
    deleteOneDocument: (condition) => deleteOneDocument(connect, condition)
  }
}

async function findDocument (connect, condition) {
  const model = await connect()
  const data = await model.findOne(condition)
  model.db.close()
  return data
}
async function insertDocument (connect, document) {
  const model = await connect()
  const data = await model.create(document)
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
