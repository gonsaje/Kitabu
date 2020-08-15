const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User =  require('./User'); 

const Collector =  User.discriminator('Collector', new Schema({
    address: {
        type: String,
        required: true
    },
    drive: [{id: { type: Schema.Types.ObjectId, ref: 'Book'}}],
    phone: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: true
    },
    orgName: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}))

module.exports = Collector = mongoose.model('Collector')