const mongoose = require('./connectDB');

const ClassSchema = mongoose.Schema({
  name: String,
  unitID: {type: String, ref: 'unit'},
  formTeacher: {type: String, ref: 'user'},
  student: [{type: String, ref: 'student'}],
  slug: String,
}, {collection: 'class', timestamps: true})

const ClassModel = mongoose.model('class', ClassSchema);
module.exports = ClassModel;
