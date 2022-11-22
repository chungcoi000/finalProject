const mongoose = require('./connectDB')
const PostSchema = mongoose.Schema({
    title: String,
    classId: {type: String, ref: 'class'},
    authorID: { ref: 'user', type: String },
    file: [{}],
    content: String,
}, { collection: "post", timeStamps: true })

const PostModel = mongoose.model('Post', PostSchema)
module.exports = PostModel