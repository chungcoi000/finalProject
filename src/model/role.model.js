const mongoose = require('./connectDB');

const RoleSchema = mongoose.Schema({
  name: {type: 'string', enum: ['teacher', 'student', 'parent', 'admin'], default: 'student'},
  slug: String,
}, {collection: "role", timestamps: true})

const RoleModel = mongoose.model('role', RoleSchema);
module.exports = RoleModel;