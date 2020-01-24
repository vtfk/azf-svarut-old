const logger = require('@vtfk/logger')
const svarut = require('./svarut')

module.exports = (context, document) => {
  logger('info', ['handle-letter', 'document id', document.id])
  context.log(document)
}
