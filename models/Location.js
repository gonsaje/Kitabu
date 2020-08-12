const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // location: {
    //     type: pointSchema,
    //     required: true
    // }
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Point'
    }
})

module.exports = Location = mongoose.model('Location', LocationSchema)