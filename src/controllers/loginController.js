const User = require('../models/user')
const { validateHashSalt } = require('../helpers/crypto')

module.exports = (req, res, next) => {
  const { email, password } = req.body

  // find user by email
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Email is not found' })
    }
    const { salt, hash } = user
    if (validateHashSalt(password, salt, hash)) {
      res.json({ success: true })
    }
  })
}
