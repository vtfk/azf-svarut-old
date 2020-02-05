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
    enum: ['QUEUED', 'RUNNING', 'DONE', 'READ', 'ERROR', 'ERROR_UNKNOWN_SVARUT_STATUS'],
    default: 'QUEUED'
  },
  callbackUrls: [String],
  svarUt: {
    forsendelsesId: String,
    status: String
  }
})

module.exports = letterSchema
