const mongoose = require('./connectDB');

const SubjectSchema = mongoose.model({
    name: String,
    slug: String,
}, { collection: 'subject', timestamp: true })

const SubjectModel = mongoose.model("subject", SubjectSchema)
module.exports = SubjectModel