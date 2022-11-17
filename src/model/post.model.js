const mongoose = require('./connectDB')
const PostSchema = mongoose.Schema({
    name: 'String',
    userID: { ref: 'user', type: 'string' },
    file: [{}],
}, { collection: "post", timeStamps: true })

const PostModel = mongoose.model('Post', PostSchema)
module.exports = PostModel