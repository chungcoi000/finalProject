const mongoose = require('./connectDB');

const RoleSchema = mongoose.Schema({
    name: String,
    slug: String,
}, { collection: "role", timestamps: true })

const RoleModel = mongoose.model('role', RoleSchema);
module.exports = RoleModel;