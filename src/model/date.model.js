const mongoose = require('./connectDB')

const DateSchema = mongoose.Schema({
  day: {type: String, default: 'Monday', enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}
}, {collection: 'date', timestamp: true})

const DateModel = mongoose.model('date', DateSchema);
module.exports = DateModel;