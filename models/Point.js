const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const PointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
})

module.exports = Point = mongoose.model('points', PointSchema)