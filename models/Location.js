const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    country: {
        type: String
    },
    city: {
        type:String
    },
    address: {
        type: String
    },
    coordinates: {
        type: [Number],
        required: true,
    }
})

module.exports = Location = mongoose.model('Location', LocationSchema)