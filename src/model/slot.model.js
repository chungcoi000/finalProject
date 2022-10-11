const mongoose = require('./connectDB')

const SlotSchema = mongoose.Schema({
  slot: {type: String, default: '1', enum: ['1', '2', '3', '4', '5',]}
}, {collection: 'slot', timestamp: true})

const SlotModel = mongoose.model('slot', SlotSchema);
module.exports = SlotModel;