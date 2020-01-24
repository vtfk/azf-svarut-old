import mongoose, { Schema } from 'mongoose'

const svarutSchema = new Schema({
  correlation: String,
  letterBlobUrl: String,
  status: String,
  callbackUrl: String,
  svarUt: {
    forsendelesid: String
  }
})

async function mongoInit () {
  if (!process.env.COSMOS_CONNECTION) throw Error('Missing required env: COSMOS_CONNECTION')
  if (!process.env.COSMOS_COLLECTION) throw Error('Missing required env: COSMOS_COLLECTION')
  async function connect () {
    const connection = await mongoose.connect(process.env.COSMOS_CONNECTION)
    return connection.model('svarut', svarutSchema, process.env.COSMOS_COLLECTION)
  }

  return {
    findByCid: (cId) => findByCid(connect, cId),
    insertDocument: (docuemnt) => insertDocument(connect, document)
  }
}

async function findByCid (connection, cId) {

}
async function insertDocument (connection, cId) {

}

module.exports = mongoInit
