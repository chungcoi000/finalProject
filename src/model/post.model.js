const mongoose = require('./connectDB');

const PostSchema = mongoose.Schema({
    title: String,
    classID: {type: String, ref: 'class'},
    authorID: { ref: 'user', type: String },
    content: String,
}, { collection: "post", timestamps: true })

const PostModel = mongoose.model('Post', PostSchema)
module.exports = PostModel