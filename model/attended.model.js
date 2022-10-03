const mongoose = require('./connectDB')

const attendedSchema = mongoose.Schema({
    name: String,
    date: Date,
    attend: { type: String, ref: 'attended' },
    class_slotID: { type: String, ref: 'class_slot' },
    slug: String,
}, { collection: 'class_slot', timestamps: true })

const attendedModel = mongoose.model('class_slot', attendedSchema);
module.exports = attendedModel;
