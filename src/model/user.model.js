const mongoose = require('./connectDB');

const UserSchema = mongoose.Schema({
  email: String,
  name: String,
  dob: Date,
  role: { type: String, ref: 'role' },
  child: { type: String, ref: 'user' },
  phone: String,
  subject: { type: String, ref: 'subject' },
  gender: { type: String, enum: ['male', 'female'], default: 'male' },
  identityNumber: String,
  avatar: {
    type: String,
    default: 'default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg'
  },
  token: String,
  password: String,
  unit: {type: String, ref:'unit'}
}, { collection: "user", timestamps: true })

const UserModel = mongoose.model('user', UserSchema);

// UserModel.create({
//   name: "Admin",
//   email: "admin@gmail.com",
//   password: "admin@123",
//   role: "admin"
// })

module.exports = UserModel;