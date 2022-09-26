const mongoose = require('./connectDB');

const ClassSchema = mongoose.Schema({
    name: String,
    unitID: { type: String, ref: 'unit' },
    fromTeacher: { type: String, ref: 'user' },
    slug: String
}, { collection: 'class', timestamps: true })

const ClassModel = mongoose.model('class', ClassSchema);
module.exports = ClassModel;
