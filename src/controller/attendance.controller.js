const UserModel = require('../model/user.model')
const attendanceModel = require('../model/attendance.model')
const Class_SlotModel = require("../model/class_slot.model");

const takeAttendance = async (req, res) => {
  try {
    let user = await UserModel.findOne({token: req.cookies.user})
    if (user.role == 'teacher') {
      let attendance = await attendanceModel.findOneAndUpdate({
        class_slot: req.body.class_slot,
      }, {
        attendances: req.body.attendances,
        class_slot: req.body.class_slot,
        classID: req.body.classID
      }, {
        new: true, setDefaultsOnInsert: true, upsert: true
      });
      return res.json({
        data: attendance,
        status: 200,
        message: "Take Attendance Successful"
      })
    } else {
      return res.json({status: 400, message: "User not found"})
    }
  } catch (e) {
    res.json(e)
  }
}

const viewAttendance = async (req, res) => {
  try {
    // let user = await UserModel.findOne({token: req.cookies.user});
    let filter = {}
    if (req.query.attendances) {
      filter = {attendances: req.query.attendances}
    } else if (req.query.classID) {
      filter = {classID: req.query.classID}
    } else if (req.query.class_slot) {
      filter = {class_slot: req.query.class_slot}
    } else {
      filter = {}
    }

    const attendance = await attendanceModel.find(filter).populate("attendances").populate("classID").populate({
      path: "class_slot",
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
    });
    return res.json({
      data: attendance
    })
  } catch (e) {
    res.json(e)
  }
}


module.exports = {viewAttendance, takeAttendance}