const mongoose = require('./connectDB');

const UnitSchema = mongoose.Schema({
  name: String,
  slug: String
}, {collection: 'unit'});

const UnitModel = mongoose.model('unit', UnitSchema);

// UnitModel.create({name: 10})
// UnitModel.create({name: 11})
// UnitModel.create({name: 12})

module.exports = UnitModel;