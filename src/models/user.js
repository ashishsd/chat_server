const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
    unique: true
  },
  hash: String,
  salt: String
}, { timestamps: true })

UserSchema.plugin(uniqueValidator)
const User = mongoose.model('User', UserSchema)
module.exports = User
