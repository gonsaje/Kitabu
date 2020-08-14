const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    donorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    books: {
        
    },
    date: {
      type: Date,
      default: Date.now
    },

  })

module.exports = Collection = mongoose.model('Collection', CollectionSchema);