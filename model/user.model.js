const mongoose = require('./connectDB');

const UserSchema = mongoose.Schema({
    // avatar: String,
    email: String,
    name: String,
    dob: Date,
    role: { type: String, ref: 'role' },
    class: { type: String, ref: 'class' },
    child: { type: String, ref: 'user' },
    phone: Number,
    subject: { type: String, ref: 'subject' },
    gender: { type: String, enum: ['male', 'female'], default: 'male' },
    avatar: { type: String, default: 'public/static/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg' },
    tokken: String,
    password: String
}, { collection: "user", timestamps: true })

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;