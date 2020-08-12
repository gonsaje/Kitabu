const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
  })

module.exports = Collection = mongoose.model('collections', CollectionSchema);