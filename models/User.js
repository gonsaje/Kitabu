const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    // location: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Location',
    //   required: true
    // },
    points: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now
    },
  })

module.exports = User = mongoose.model('User', UserSchema);
