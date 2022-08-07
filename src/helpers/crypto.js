const crypto = require('crypto')

const { SALT_ITERATIONS, KEY_LENGTH, DIGEST } = require('../constant')

const generateHashSalt = (password) => {
  const salt = crypto.randomBytes(128).toString('base64')
  const hash = crypto
    .pbkdf2Sync(password, salt, SALT_ITERATIONS, KEY_LENGTH, DIGEST)
    .toString('hex')
  return {
    salt, hash
  }
}

const validateHashSalt = (password, salt, storedHash) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, SALT_ITERATIONS, KEY_LENGTH, DIGEST)
    .toString('hex')
  return hash === storedHash
}

module.exports = {
  generateHashSalt,
  validateHashSalt
}
