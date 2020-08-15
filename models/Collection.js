const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    donorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    books: [{
        title: {
            type: String,
        },
        authors: {
            type: [String],
        },
        ISBN: {
            type: String
        },
        image: {
            type: String
        },
        condition: {
            type: String
        }
    }],
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