const mongoose = require('./connectDB')

const class_slotSchema = mongoose.Schema({
    name: String,
    slotID: { type: String, ref: 'slot' },
    classID: { type: String, ref: 'class' },
    teacherID: { type: String, ref: 'user' },
    subjectID: { type: String, ref: 'subject' },
    slug: String,
}, { collection: 'class_slot', timestamps: true })

const Class_slotModel = mongoose.model('class_slot', class_slotSchema);
module.exports = Class_slotModel;
