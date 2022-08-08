const jwt = require('jsonwebtoken')

const User = require('../models/user')
const { validateHashSalt } = require('../helpers/crypto')
const { JWT_KEY } = require('../constant')

module.exports = (req, res, next) => {
  const { email, password } = req.body

  // find user by email
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Email is not found' })
    }
    const { salt, hash, name, email } = user
    if (validateHashSalt(password, salt, hash)) {
      const token = jwt.sign({
        name, email
      }, JWT_KEY)
      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production'
        })
        .status(200)
        .json({ success: true })
    }
  })
}
