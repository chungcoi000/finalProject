const mongoose = require('./connectDB')

const attendanceSchema = mongoose.Schema({
  name: String,
  date: String,
  attend: {type: String, ref: 'attended', enum: ["attended", "absent"]},
  class_slot: {type: String, ref: 'class_slot'},
  slug: String,
}, {collection: 'class_slot', timestamps: true})

const attendanceModel = mongoose.model('attendance', attendanceSchema);
module.exports = attendanceModel;
