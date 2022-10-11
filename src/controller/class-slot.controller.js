const Class_slotModel = require('../model/class_slot.model');
const slug = require('slugify');

async function createClassSlot(req, res) {
  try {
    let class_slot = await Class_slotModel.findOne({name: req.body.name})
    if (class_slot) {
      res.json({status: 404, message: 'Class slot is already existed'})
    } else {
      let createClass_slot = Class_slotModel.create({
        name: req.body.name,
        slotID: req.body.slotID,
        classID: req.body.classID,
        teacherID: req.body.teacherID,
        subjectID: req.body.subjectID,
        slug: slug(req.body.name)
      })
      res.json({status: 200, message: 'Create class slot successful', data: createClass_slot})
    }
  } catch (e) {
    res.json(e)
    console.log(e);
  }
}


async function viewClassSlots(req, res) {
  try {
    let classSlots = await Class_slotModel.find()
    res.json({status: 200, data: classSlots})
  } catch (e) {
    res.json(e);
    console.log(e);
  }
}

const viewClassSlot = async (req, res) => {
  try {
    let classSlot = await Class_slotModel.findOne({_id: req.body.classID});
    if (!classSlot) return res.json({status: 404, message: 'Class Slot not found!'});
    res.json({status: 200, data: classSlot});
  } catch (e) {
    console.log(e)
  }
}

async function updateClassSlot(req, res) {
  try {
    let Class_Slot = await Class_slotModel.findOne({slug: req.params.slug})
    if (Class_Slot) {
      res.json({status: 200, Class_Slot: Class_Slot})
    } else {
      res.json({status: 404, status: 'Not Found'})
    }
  } catch (e) {
    res.json(e);
    console.log(e);
  }
}

async function deleteClassSlot(req, res) {
  try {
    let classSlot = await Class_slotModel.findOne({slug: req.params.slug})
    if (classSlot) {
      let classSlotDelete = await Class_slotModel.deleteOne({_id: classSlot._id})
      res.json({status: 200, message: "Delete class slot success", data: classSlotDelete});
    } else {
      res.json({status: 404, status: 'Not Found'})
    }
  } catch (e) {
    res.json(e);
    console.log(e);
  }
}


module.exports = {deleteClassSlot, updateClassSlot, viewClassSlots, createClassSlot, viewClassSlot}

