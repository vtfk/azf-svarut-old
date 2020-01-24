const { logger } = require('@vtfk/logger')
const { performance } = require('perf_hooks')

const handleLetter = require('../lib/handle-letter')

module.exports = async function (context, documents) {
  logger('info', ['cosmos-trigger', 'documents', 'length', (documents ? documents.length : 0)])
  const startTime = performance.now()

  // Send letters to SvarUT
  await Promise.all(documents.forEach(handleLetter))

  const endTime = performance.now()
  logger('info', 'cosmos-trigger', `handled in ${Math.round(endTime - startTime)} ms`)
}
