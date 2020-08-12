const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locationSchema = require('./Location');

const UserSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    class: {
      type: String,
      required: true
    },
    location: {
      type: locationSchema,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
  })

module.exports = User = mongoose.model('users', UserSchema);
