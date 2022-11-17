const mongoose = require('./connectDB');

const SubjectSchema = mongoose.Schema({
  name: String,
  slug: String,
}, { collection: 'subject', timestamp: true });

const SubjectModel = mongoose.model("subject", SubjectSchema);
SubjectModel.create({ name: 'a' })
module.exports = SubjectModel;