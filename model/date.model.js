const mongoose = require('./connectDB')

const DateSchema = mongoose.Schema({
    day: { type: String, default: 'thu 2', enum: ['thu 2', 'thu 3', 'thu 4', 'thu 5', 'thu 6', 'thu 7'] }
}, { collection: 'date', timestamp: true })

const DateModel = mongoose.model('date', DateModel);
module.exports = DateModel;