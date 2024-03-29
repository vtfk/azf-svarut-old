const { logger } = require('@vtfk/logger')
const db = require('../lib/db')()
const svarut = require('../lib/svarut')
const statusMapper = require('../lib/status-mapper')

module.exports = async function (context, myTimer) {
  if (myTimer.IsPastDue) {
    logger('warn', ['LetterStatusPoller', 'Function is running late!'])
  }

  logger('info', ['LetterStatusPoller', 'Finding letter with status', 'RUNNING'])
  let runningLetters
  try {
    runningLetters = await db.findDocuments({ status: 'RUNNING' })
  } catch (error) {
    logger('error', ['LetterStatusPoller', 'Could not retrieve documents from DB', 'Error', error])
    throw error
  }

  if (runningLetters.length === 0) {
    logger('info', ['LetterStatusPoller', 'No letters with status', 'RUNNING', 'Exiting...'])
    return
  }

  logger('info', ['LetterStatusPoller', 'Found', runningLetters.length, 'with status', 'RUNNING'])
  const letterIds = runningLetters.map(letter => letter.svarUt.forsendelsesId)

  logger('info', ['LetterStatusPoller', 'Getting status for', runningLetters.length, 'letters'])
  let receivedLetterStatuses
  try {
    receivedLetterStatuses = (await svarut.getStatus(letterIds)).statuser
  } catch (error) {
    logger('error', ['LetterStatusPoller', 'Could not retrieve status from SvarUt', 'Error', error])
    throw error
  }
  const updatedLetters = receivedLetterStatuses.filter(letter => statusMapper(letter.status) !== 'RUNNING')

  if (updatedLetters.length === 0) {
    logger('info', ['LetterStatusPoller', 'No letters with updated status', 'Exiting...'])
    return
  }

  logger('info', ['LetterStatusPoller', 'Found', updatedLetters.length, 'letters with updated status'])

  logger('info', ['LetterStatusPoller', 'Updating DB with', updatedLetters.length, 'updated letters'])
  const updatedDocuments = await Promise.all(updatedLetters.map(svarutLetter => {
    const originalDocument = runningLetters.find(letter => letter.svarUt.forsendelsesId === svarutLetter.forsendelsesId.id)

    try {
      return db.updateDocuments({
        correlationId: originalDocument.correlationId
      }, {
        $set: {
          status: statusMapper(svarutLetter.status),
          svarUt: {
            lastStatusChange: svarutLetter.sisteStatusEndring,
            status: svarutLetter.status
          }
        }
      })
    } catch (error) {
      logger('error', ['LetterStatusPoller', 'Could not update document', 'Error', error])
      throw error
    }
  }))

  const stats = {
    matches: 0,
    changes: 0
  }

  updatedDocuments.forEach(result => {
    stats.matches += result.n
    stats.changes += result.nModified
  })
  logger('info', ['LetterStatusPoller', 'Changed', stats.changes, 'letters in DB'])
}
