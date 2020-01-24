import { Schema } from 'mongoose'

const letterSchema = new Schema({
  correlation: String,
  letterBlobUrl: String,
  status: String,
  callbackUrl: String,
  svarUt: {
    forsendelesid: String
  }
})

module.exports = letterSchema
