const { generateHashSalt } = require('../helpers/crypto')
const User = require('../models/user')

module.exports = (req, res, next) => {
  const payload = req.body
  const {
    name,
    email,
    password
  } = payload

  // generate salt
  const { hash, salt } = generateHashSalt(password)
  // create an instance of user
  const user = new User({
    name,
    email,
    hash,
    salt
  })

  user.save((err) => {
    if (err) {
      res.json({ success: false, error: err })
    } else {
      res.json({ success: true, error: false })
    }
  })
}
