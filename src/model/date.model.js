const mongoose = require('./connectDB');

const DateSchema = mongoose.Schema({
    name: { type: 'string', enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
}, { collection: "date", timestamps: true })

const DateModel = mongoose.model('date', DateSchema);
// DateModel.create({
//     name: 'Monday'
// })
// DateModel.create({
//     name: 'Tuesday'
// })
// DateModel.create({
//     name: 'Wednesday'
// })
// DateModel.create({
//     name: 'Thursday'
// })
// DateModel.create({
//     name: 'Friday'
// })
// DateModel.create({
//     name: 'Saturday'
// })
module.exports = DateModel;