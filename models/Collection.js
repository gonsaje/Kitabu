const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    partnerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    },
  })

module.exports = Collection = mongoose.model('Collection', CollectionSchema);