const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    author: {
      type: [String],
      required: true
    },
    ISBN: {
        type:String,
        required: true,
        default: "0000000000000"
    },
    donorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    },
  })

module.exports = User = mongoose.model('Book', BookSchema);