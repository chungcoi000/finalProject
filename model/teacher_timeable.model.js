const mongoose = require('./connectDB');

const Teacher_TimeableSchema = mongoose.Schema({
    slug: String,
    schedular: { type: String, ref: 'teacher_schedular' }
}, { collection: "teacher_Schedular", timestamp: true });

const Teacher_TimeableModel = mongoose.model('teacher_Schedular', Teacher_TimeableSchema);
module.exports = Teacher_TimeableModel;