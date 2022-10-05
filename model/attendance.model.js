const mongoose = require('./connectDB')

const attendanceSchema = mongoose.Schema({
    name: String,
    date: Date,
    attend: { type: String, ref: 'attended' },
    class_slot: { type: String, ref: 'class_slot' },
    slug: String,
}, { collection: 'class_slot', timestamps: true })

const attendanceModel = mongoose.model('class_slot', attendanceSchema);
module.exports = attendanceModel;
