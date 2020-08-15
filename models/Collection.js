const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    donorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    books: [{
        id: { type: Schema.Types.ObjectId, 
                ref: 'Book'
            }}],
    status: {
        type: String,
        default: "Pending"
    },
    points: {
        type: Number,
        default: 0
    },
    date: {
      type: Date,
      default: Date.now
    },

  })

module.exports = Collection = mongoose.model('Collection', CollectionSchema);