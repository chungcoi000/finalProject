const mongoose = require('./connectDB');

const RoleSchema = mongoose.Schema({
  name: {type: 'string', enum: ['teacher', 'student', 'parent', 'admin'], default: 'student'},
}, {collection: "role", timestamps: true})

const RoleModel = mongoose.model('role', RoleSchema);
// RoleModel.create({name: 'teacher'})
// RoleModel.create({name: 'student'})
// RoleModel.create({name: 'parent'})
// RoleModel.create({name: 'admin'})
module.exports = RoleModel;