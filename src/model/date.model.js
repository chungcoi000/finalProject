const mongoose = require('./connectDB');

const DateSchema = mongoose.Schema({
  name: {type: 'string', enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']},
  index: Number
}, {collection: "date", timestamps: true})

const DateModel = mongoose.model('date', DateSchema);

// DateModel.create({name: 'Monday', index: 0})
// DateModel.create({name: 'Tuesday', index: 1})
// DateModel.create({name: 'Wednesday', index: 2})
// DateModel.create({name: 'Thursday', index: 3})
// DateModel.create({name: 'Friday', index: 4})
// DateModel.create({name: 'Saturday', index: 5})


module.exports = DateModel;