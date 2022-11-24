const mongoose = require('./connectDB')

const timetableSchema = mongoose.Schema({
  name: String,
  class_slotID: [{type: String, ref: 'class_slot'}],
  slug: String,
}, {collection: 'timetable', timestamps: true})

const timetableModel = mongoose.model('timetable', timetableSchema);

module.exports = timetableModel;
