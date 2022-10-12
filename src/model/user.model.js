const mongoose = require('./connectDB');

const UserSchema = mongoose.Schema({
  // avatar: String,
  email: {type: String, required: true},
  name: {type: String, required: true},
  dob: Date,
  role: {type: String, ref: 'role', required: true},
  class: {type: String, ref: 'class'},
  child: {type: String, ref: 'user'},
  phone: String,
  identity: String,
  address: String,
  subject: {type: String, ref: 'subject'},
  gender: {type: String, enum: ['male', 'female'], default: 'male'},
  avatar: {
    type: String,
    default: 'public/static/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg'
  },
  token: String,
  password: {type: String, required: true},
}, {collection: "user", timestamps: true})

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;