const Class_slotModel = require('../model/class_slot.model');
const slug = require('slugify');
const UserModel = require("../model/user.model");
const ClassModel = require("../model/class.model");

async function createClassSlot(req, res) {
  try {
    let currentClassSlot = await Class_slotModel.findOne({teacherID: req.body.teacherID, slotID: req.body.slotID});
    if (currentClassSlot) return res.json({status: 400, message: "Teacher is already in a class slot"});

    let classSlot = await Class_slotModel.findOne({classID: req.body.classID, slotID: req.body.slotID, name: req.body.name});
    if (classSlot) return res.json({status: 400, message: "Class Slot is already existed"});

    let createClass_slot = await Class_slotModel.create({
      name: req.body.name,
      slotID: req.body.slotID,
      classID: req.body.classID,
      teacherID: req.body.teacherID,
      subjectID: req.body.subjectID,
      slug: slug(req.body.name)
    })
    let newClassSlot = await Class_slotModel.findOne({_id: createClass_slot._id}).populate("subjectID").populate("teacherID");
    res.json({status: 200, message: 'Create class slot successful', data: newClassSlot})
  } catch (e) {
    res.json(e)
    console.log(e);
  }
}

async function viewClassSlots(req, res) {
  try {
    let classSlots = await Class_slotModel.find({
      classID: req.query.classID,
      slotID: req.query.slotID
    }).populate("subjectID").populate("teacherID");
    res.json({status: 200, data: classSlots})
  } catch (e) {
    res.json(e);
    console.log(e);
  }
}

const viewClassSlot = async (req, res) => {
  try {
    let classSlot = await Class_slotModel.findOne({_id: req.params.id}).populate("subjectID").populate("teacherID").populate(
      {
        path: "classID",
        populate: [
          {
            path: "formTeacher",
          }, {
            path: "student"
          }, {
            path: "unit"
          }
        ]
      });
    if (!classSlot) return res.json({status: 404, message: 'Class Slot not found!'});
    res.json({status: 200, data: classSlot});
  } catch (e) {
    console.log(e)
  }
}

async function updateClassSlot(req, res) {
  try {
    let class_slot = await Class_slotModel.findOne({_id: req.params.id})
    if (class_slot) {
      await Class_slotModel.findOneAndUpdate({_id: req.params.id}, {
        teacherID: req.body.teacherID,
        subjectID: req.body.subjectID,
      });
      let newClass = await Class_slotModel.findOne({_id: req.params.id}).populate("teacherID").populate("subjectID");
      res.json({status: 200, message: "Update class slot successful", data: newClass});
    } else {
      res.json({status: 404, message: "Class not found"});
    }
  } catch (e) {
    console.log(e);
  }
}

async function deleteClassSlot(req, res) {
  try {
    let classSlot = await Class_slotModel.findOne({_id: req.params.id})
    if (classSlot) {
      let classSlotDelete = await Class_slotModel.findOneAndDelete({_id: classSlot._id})
      res.json({status: 200, message: "Delete class slot success", data: classSlotDelete});
    } else {
      res.json({status: 404, message: 'Not Found'})
    }
  } catch (e) {
    res.json(e);
    console.log(e);
  }
}

async function slotStudent(req, res) {
  try {
    let token = req.cookies;
    let user = await UserModel.findOne({token: token.user})
    if (user.role === 'student') {
      let classStudent = await ClassModel.findOne({_id: user.class})
      if (classStudent) {
        let classSlot = await Class_slotModel.findOne({classID: classStudent.id}).populate('slotID')
        res.json({status: 200, Message: 'Success', classSlot})
      } else {
        res.json({status: 404, Message: 'classSlot  not found'})
      }
    } else if (user.role === 'parent') {
      let student = await UserModel.findOne({_id: user.child})
      let classStudent = await ClassModel.findOne({_id: student.class})
      if (classStudent) {
        let classSlot = await Class_slotModel.findOne({classID: classStudent.id}).populate('slotID')
        res.json({status: 200, Message: 'Success', classSlot})
      } else {
        res.json({status: 404, Message: 'classSlot  not found'})
      }
    }
  } catch (e) {
    console.log(e);
  }
}


module.exports = {
  deleteClassSlot,
  updateClassSlot,
  viewClassSlots,
  createClassSlot,
  viewClassSlot,
  slotStudent
}

