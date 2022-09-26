const mongoose = require('./connectDB');

const Teacher_SchedularSchema = mongoose.Schema({
    date: [{}],
    subject: { type: String, ref: 'subject' },
    class: [{}],
}, { collection: "teacher_Schedular", timestamp: true });

const Teacher_SchedularModel = mongoose.model('teacher_Schedular', Teacher_SchedularSchema);
module.exports = Teacher_SchedularModel;