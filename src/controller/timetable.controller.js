const router = require('express').Router();
const UserModel = require('../model/user.model');
const ClassModel = require('../model/class.model');
const Class_slotModel = require('../model/class_slot.model');
const timetableModel = require('../model/timetable.model');

async function createTimeTable(req, res) {
  try {
    const timetable = await timetableModel.create({
      dateID: req.body.dateID,
      class_slotID: req.body.class_slotID,
    })
    const newTimetable = await timetableModel.findOne({_id: timetable._id}).populate("dateID").populate("class_slotID")
    res.json({status: 200, message: 'Add to timetable successfully', data: newTimetable});
  } catch (e) {
    res.json(e)
    console.log(e);
  }
}

async function timeTableClass(req, res) {
  try {
    let timetable = []
    let slot1 = []
    let slot2 = []
    let slot3 = []
    let slot4 = []
    let slot5 = []

    let classTime = await ClassModel.findOne({_id: req.params.id});
    if (classTime) {
      let classSlot = await Class_slotModel.find({classID: classTime.id}).sort("slotID");
      for (let i = 0; i < classSlot.length; i++) {
        let timeTable1 = await timetableModel.findOne({class_slotID: classSlot[i].id})
          .populate(
            {
              path: "class_slotID",
              populate: [
                {
                  path: "slotID",
                }, {
                  path: "teacherID"
                }, {
                  path: "subjectID"
                }
              ]
            }).populate("dateID");

        if (timeTable1) {
          if (timeTable1.class_slotID.slotID.slot == "1") {
            slot1.push(timeTable1)
            slot1.sort((a, b) => a.dateID.index - b.dateID.index)
          } else if (timeTable1.class_slotID.slotID.slot == "2") {
            slot2.push(timeTable1)
            slot2.sort((a, b) => a.dateID.index - b.dateID.index)
          } else if (timeTable1.class_slotID.slotID.slot == "3") {
            slot3.push(timeTable1)
            slot3.sort((a, b) => a.dateID.index - b.dateID.index)
          } else if (timeTable1.class_slotID.slotID.slot == "4") {
            slot4.push(timeTable1)
            slot4.sort((a, b) => a.dateID.index - b.dateID.index)
          } else {
            slot5.push(timeTable1)
            slot5.sort((a, b) => a.dateID.index - b.dateID.index)
          }
        }
      }

      for (let i = 0; i <= 5; i++) {
        if (slot1[i]?.dateID?.index != i) {
          slot1.splice(i, 0, {});
        }
      }

      for (let i = 0; i <= 5; i++) {
        if (slot2[i]?.dateID?.index != i) {
          slot2.splice(i, 0, {});
        }
      }

      for (let i = 0; i <= 5; i++) {
        if (slot3[i]?.dateID?.index != i) {
          slot3.splice(i, 0, {});
        }
      }

      for (let i = 0; i <= 5; i++) {
        if (slot4[i]?.dateID?.index != i) {
          slot4.splice(i, 0, {});
        }
      }

      for (let i = 0; i <= 5; i++) {
        if (slot5[i]?.dateID?.index != i) {
          slot5.splice(i, 0, {});
        }
      }

      timetable = [slot1, slot2, slot3, slot4, slot5];

      return res.json({status: 200, message: 'Success', data: timetable})
    } else {
      return res.json({status: 404, message: 'Timetable  not found'})
    }
  } catch (e) {
    console.log(e);
  }
}

async function timeTableTeacher(req, res) {
  try {
    let timetable = []
    let slot1 = []
    let slot2 = []
    let slot3 = []
    let slot4 = []
    let slot5 = []
    let token = req.cookies;
    let user = await UserModel.findOne({token: token.user})
    if (user) {
      let classSlot = await Class_slotModel.find({teacherID: user._id}).populate('classID')
      for (let i = 0; i < classSlot.length; i++) {
        let timeTable1 = await timetableModel.findOne({class_slotID: classSlot[i].id})
          .populate(
            {
              path: "class_slotID",
              populate: [
                {
                  path: "slotID",
                }, {
                  path: "teacherID"
                }, {
                  path: "subjectID"
                }, {
                  path: "classID"
                }
              ]
            }).populate("dateID");
        if (timeTable1) {
          if (timeTable1.class_slotID.slotID.slot == "1") {
            slot1.push(timeTable1)
            slot1.sort((a, b) => a.dateID.index - b.dateID.index)
          } else if (timeTable1.class_slotID.slotID.slot == "2") {
            slot2.push(timeTable1)
            slot2.sort((a, b) => a.dateID.index - b.dateID.index)
          } else if (timeTable1.class_slotID.slotID.slot == "3") {
            slot3.push(timeTable1)
            slot3.sort((a, b) => a.dateID.index - b.dateID.index)
          } else if (timeTable1.class_slotID.slotID.slot == "4") {
            slot4.push(timeTable1)
            slot4.sort((a, b) => a.dateID.index - b.dateID.index)
          } else {
            slot5.push(timeTable1)
            slot5.sort((a, b) => a.dateID.index - b.dateID.index)
          }
        }
      }
      for (let i = 0; i <= 5; i++) {
        if (slot1[i]?.dateID?.index != i) {
          slot1.splice(i, 0, {});
        }
      }

      for (let i = 0; i <= 5; i++) {
        if (slot2[i]?.dateID?.index != i) {
          slot2.splice(i, 0, {});
        }
      }

      for (let i = 0; i <= 5; i++) {
        if (slot3[i]?.dateID?.index != i) {
          slot3.splice(i, 0, {});
        }
      }

      for (let i = 0; i <= 5; i++) {
        if (slot4[i]?.dateID?.index != i) {
          slot4.splice(i, 0, {});
        }
      }

      for (let i = 0; i <= 5; i++) {
        if (slot5[i]?.dateID?.index != i) {
          slot5.splice(i, 0, {});
        }
      }

      timetable = [slot1, slot2, slot3, slot4, slot5];
      res.json({status: 200, message: 'Success', data: timetable})
    } else {
      res.json({status: 404, message: 'Timetable  not found'})
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {createTimeTable, timeTableClass, timeTableTeacher}