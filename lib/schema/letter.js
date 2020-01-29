import { Schema } from 'mongoose'

const letterSchema = new Schema({
  correlationId: {
    type: String,
    required: true
  },
  letterBlobUrl: String,
  status: {
    type: String,
    enum: ['QUEUED', 'SENDING', 'SENT'],
    default: 'QUEUED'
  },
  callbackUrl: String,
  svarUt: {
    forsendelesId: String
  }
})

module.exports = letterSchema
