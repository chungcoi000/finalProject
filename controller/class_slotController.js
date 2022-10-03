const Class_slotModel = require('../model/class_slot.model');
const slug = require('slugify');

async function createClass_slot(req, res) {
    try {
        let class_slot = await Class_slotModel.findOne({ name: req.body.name })
        if (class_slot) {
            res.json({ status: 404, message: 'Class slot name da ton tai' })
        } else {
            let createClass_slot = Class_slotModel.create({
                name: req.body.name,
                slotID: req.body.slotID,
                classID: req.body.classID,
                teacherID: req.body.teacherID,
                subjectID: req.body.subjectID,
                slug: slug(req.body.name)
            })
            response.json({ status: 200, data: createClass_slot })
        }
    } catch (e) {
        res.json(e)
        console.log(e);
    }
}


async function viewClass_Slot(req, res) {
    try {
        let Class_Slots = await Class_slotModel.find()
        res.json({ status: 200, Class_Slots: Class_Slots })
    } catch (e) {
        res.json(e);
        console.log(e);
    }
}

async function updateClass_Slot(req, res) {
    try {
        let Class_Slot = await Class_slotModel.findOne({ slug: req.params.slug })
        if (Class_Slot) {
            res.json({ status: 200, Class_Slot: Class_Slot })
        } else {
            res.json({ status: 404, status: 'Not Found' })
        }
    } catch (e) {
        res.json(e);
        console.log(e);
    }
}

async function deleteClass_Slot(req, res) {
    try {
        let Class_Slot = await Class_slotModel.findOne({ slug: req.params.slug })
        if (Class_Slot) {
            let Class_SlotDelete = await Class_slotModel.deleteOne({ _id: Class_Slot._id })
            res.json({ status: 200, message: Class_SlotDelete })
        } else {
            res.json({ status: 404, status: 'Not Found' })
        }
    } catch (e) {
        res.json(e);
        console.log(e);
    }
}


module.exports = { deleteClass_Slot, updateClass_Slot, viewClass_Slot, createClass_slot }

