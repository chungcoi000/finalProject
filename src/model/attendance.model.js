const mongoose = require('./connectDB')

const attendanceSchema = mongoose.Schema({
  attend: [{}],
  classID: { type: String, ref: 'class' },
  class_slot: { type: String, ref: 'class_slot' },
}, { collection: 'attendance', timestamps: true })

const attendanceModel = mongoose.model('attendance', attendanceSchema);
module.exports = attendanceModel;
