const mongoose = require('./connectDB');

const Student_TimeableSchema = mongoose.Schema({
    class: [{}],
    slug: String,
    schedular: { type: String, ref: 'student_schedular' }
}, { collection: "student_Timeable", timestamp: true });

const Student_TimeableModel = mongoose.model('student_Timeable', Student_TimeableSchema);
module.exports = Student_TimeableModel;