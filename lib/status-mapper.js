const { logger } = require('@vtfk/logger')

const statuses = {
  MOTTAT: 'RUNNING',
  AKSEPTERT: 'RUNNING',
  VARSLET: 'RUNNING',
  SENDT_PRINT: 'RUNNING',
  SENDT_DIGITALT: 'RUNNING',
  SENDT_SDP: 'RUNNING',
  LEVERT_SDP: 'RUNNING',
  IKKE_LEVERT: 'RUNNING',
  MANUELT_HANDTERT: 'RUNNING',
  AVVIST: 'ERROR',
  LEST: 'DONE',
  PRINTET: 'DONE',
  KLAR_FOR_MOTTAK: 'DONE'
}

function mapStatus (svarUtStatus) {
  let status = statuses[svarUtStatus]
  if (!status) {
    logger('error', ['status-mapper', 'Unknown status provided', svarUtStatus])
    status = 'ERROR_UNKNOWN_SVARUT_STATUS'
  }
  logger('debug', ['status-mapper', 'Mapped status', svarUtStatus, status])
  return status
}

module.exports = mapStatus
