const mongoose = require('./connectDB')
const PostSchema = mongoose.Schema({
    title: 'String',
    AuthorID: { ref: 'user', type: 'string' },
    file: [{}],
    content: String,
}, { collection: "post", timeStamps: true })

const PostModel = mongoose.model('Post', PostSchema)
module.exports = PostModel