const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {discriminatorKey: "class", collection: "users"}

const UserSchema = new Schema({
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
    coordinates: {
      type: [Number],
      required: true
  },
    points: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now
    },
  }, options)

const User = mongoose.model("User", UserSchema)


const Collector =  User.discriminator('Collector', new Schema({
  address: {
      type: String,
      required: true
  },
  drive: [],
  phone: {
      type: String,
      required: true
  },
  hours: {
      type: String,
      required: true
  },
  orgName: {
      type: String,
      required: true
  },
  description: {
      type: String
  }
}))


const Collectora = mongoose.model("Collector")

module.exports = {
  User,
  Collectora
}