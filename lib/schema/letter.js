const { Schema } = require('mongoose')

const letterSchema = new Schema({
  correlationId: {
    type: String,
    required: true,
    unique: true
  },
  letterBlobUrl: String,
  status: {
    type: String,
    enum: ['QUEUED', 'SENDING', 'SENT'],
    default: 'QUEUED'
  },
  callbackUrls: [String],
  svarUt: {
    forsendelesId: String
  }
})

module.exports = letterSchema
