const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pointSchema = require('./Point');

const LocationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: pointSchema,
        required: true
    }
})

module.exports = Location = mongoose.model('locations', LocationSchema)