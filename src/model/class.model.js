const mongoose = require('./connectDB');

const ClassSchema = mongoose.Schema({
  name: String,
  unit: { type: String, ref: 'unit' },
  formTeacher: { type: String, ref: 'user' },
  student: [{ type: String, ref: 'user' }],
  slug: String,
}, { collection: 'class', timestamps: true })

const ClassModel = mongoose.model('class', ClassSchema);
module.exports = ClassModel;
