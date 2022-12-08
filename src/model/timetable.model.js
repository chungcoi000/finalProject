const mongoose = require('./connectDB');

const timetableSchema = mongoose.Schema({
  dateID: {type: String, ref: 'date'},
  class_slotID: {type: String, ref: 'class_slot'},
}, {collection: 'timetable', timestamps: true})

const timetableModel = mongoose.model('timetable', timetableSchema);

module.exports = timetableModel;
