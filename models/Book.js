const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    ISBN: {
        type:String,
        required: true
    },
    collectionId: {
        type: Schema.Types.ObjectId,
        ref: 'Collection'
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