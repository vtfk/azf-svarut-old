const svarut = require('@vtfk/svarut')({
  url: process.env.SVARUT_URL,
  username: process.env.SVARUT_USERNAME,
  password: process.env.SVARUT_PASSWORD
})

module.exports = svarut
