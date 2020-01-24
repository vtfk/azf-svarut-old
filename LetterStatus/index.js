const svarut = require('../lib/svarut')

module.exports = async function (context, req) {
  try {
    const svarutStatus = svarut.getStatus(req.bindingData.id)
    context.res = {
      body: svarutStatus
    }
  } catch (error) {

  }
}
