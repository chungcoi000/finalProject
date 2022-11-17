const router = require('express').Router();
const UserModel = require('../model/user.model');
const ClassModel = require('../model/class.model');
const Class_slotModel = require('../model/class_slot.model');
const timetableModel = require('../model/timetable.model');
const slug = require('slugify')

async function createTimeTable(req, res) {
  try {
    let timeTable = await timetableModel.findOne({ name: req.body.name })
    if (timeTable) {
      res.json({ status: 404, Message: "Timetable already exists" });
    } else {
      await timetableModel.create({
        name: req.body.name,
        dateID: req.body.dateID,
        class_slotID: req.body.class_slotID,
        slug: slug(req.body.name)
      })
      res.json({ status: 200, Message: 'created successfully' })
    }
  } catch (e) {
    res.json(e)
    console.log(e);
  }
}


async function timeTableStudent(req, res) {
  try {
    let timetable = []
    let token = req.cookies;
    let user = await UserModel.findOne({ token: token.user })
    let classStudent = await ClassModel.findOne({ _id: user.class })
    if (classStudent) {
      let classSlot = await Class_slotModel.find({ classID: classStudent.id }).sort("slotID")
      for (let i = 0; i < classSlot.length; i++) {
        let timeTable1 = await timetableModel.findOne({ class_slotID: classSlot[i].id })
        timetable.push(timeTable1)
      }
      res.json({ status: 200, Message: 'Success', timetable })
    } else {
      res.json({ status: 404, Message: 'Timetable  not found' })
    }
  } catch (e) {
    console.log(e);
  }
}

async function slotStudent(req, res) {
  try {
    let token = req.cookies;
    let user = await UserModel.findOne({ token: token.user })
    if (user.role === 'student') {
      let classStudent = await ClassModel.findOne({ _id: user.class })
      if (classStudent) {
        let classSlot = await Class_slotModel.findOne({ classID: classStudent.id }).populate('slotID')
        res.json({ status: 200, Message: 'Success', classSlot })
      } else {
        res.json({ status: 404, Message: 'classSlot  not found' })
      }
    } else if (user.role === 'parent') {
      let student = await UserModel.findOne({ _id: user.child })
      let classStudent = await ClassModel.findOne({ _id: student.class })
      if (classStudent) {
        let classSlot = await Class_slotModel.findOne({ classID: classStudent.id }).populate('slotID')
        res.json({ status: 200, Message: 'Success', classSlot })
      } else {
        res.json({ status: 404, Message: 'classSlot  not found' })
      }
    }
  } catch (e) {
    console.log(e);
  }
}

async function timeTableTeacherH(req, res) {
  try {
    let timetable = []
    let token = req.cookies;
    let user = await UserModel.findOne({ token: token.user })
    let classStudent = await ClassModel.findOne({ id: user.class })
    if (classStudent) {
      let classSlot = await Class_slotModel.find({ classID: classStudent.id }).sort("slotID")
      for (let i = 0; i < classSlot.length; i++) {
        let timeTable1 = await timetableModel.findOne({ class_slotID: classSlot.id })
        timetable.push(timeTable1)
      }
      res.json({ status: 200, Message: 'Success', timetable })
    } else {
      res.json({ status: 404, Message: 'Timetable  not found' })
    }
  } catch (e) {
    console.log(e);
  }
}

async function timeTableTeacher(req, res) {
  try {
    let timetable = []
    let token = req.cookies;
    let user = await UserModel.findOne({ token: token.user })
    if (user) {
      let classSlot = await Class_slotModel.find({ teacherID: user.id }).populate('classID')
      for (let i = 0; i < classSlot.length; i++) {
        let timeTable1 = await timetableModel.find({ class_slotID: classSlot.id })
        timetable.push(timeTable1)
      }
      res.json({ status: 200, Message: 'Success', timetable })
    } else {
      res.json({ status: 404, Message: 'Timetable  not found' })
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = { createTimeTable, timeTableStudent, slotStudent, timeTableTeacherH, timeTableTeacher }