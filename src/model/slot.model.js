const mongoose = require('./connectDB')

const SlotSchema = mongoose.Schema({
  slot: { type: String, default: '1', enum: ['1', '2', '3', '4', '5',] },
  startDate: String,
  endDate: String,
}, { collection: 'slot', timestamp: true })

const SlotModel = mongoose.model('slot', SlotSchema);
SlotModel.create({
  slot: '1',
  startDate: '7h15',
  endDate: "8h"
})

SlotModel.create({
  slot: '12',
  startDate: '8h10',
  endDate: "8h55"
})
SlotModel.create({
  slot: '3',
  startDate: '9h5',
  endDate: "9h50"
})
SlotModel.create({
  slot: '4',
  startDate: '10h',
  endDate: "10h45"
})
SlotModel.create({
  slot: '5',
  startDate: '10h55',
  endDate: "11h30"
})
module.exports = SlotModel;