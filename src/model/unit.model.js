const mongoose = require('./connectDB');

const UnitSchema = mongoose.Schema({
  name: String,
  slug: String
}, {collection: 'unit'});

const UnitModel = mongoose.model('unit', UnitSchema);

module.exports = UnitModel;