const mongoose = require('./connectDB');

const Student_SchedularSchema = mongoose.Schema({
    date: [{}],
    subject: [{}],
    teacherID: { type: String, role: 'user' },
    schedular: { type: String, ref: 'student_schedular' }
}, { collection: "student_Schedular", timestamp: true });

const Student_SchedularModel = mongoose.model('student_Schedular', Student_SchedularSchema);
module.exports = Student_SchedularModel;