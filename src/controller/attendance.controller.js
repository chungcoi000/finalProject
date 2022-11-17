const UserModel = require('../model/user.model')
const attendanceModel = require('../model/attendance.model')
const Class_slotModel = require('../model/class_slot.model')
const createAttendance = async (req, res) => {
    try {
        let user = await UserModel.findOne({ token: req.cookies.user }).populate('role')
        if (user.role.name == 'teacher') {
            let attendance = await attendanceModel.create({
                date: req.body.date,
                attend: req.body.attend,
                class_slot: req.body.class_slot,
            })
            res.json({ status: 200, message: "success" })
        } else {
            res.json({ status: 400, message: "user not found" })
        }
    } catch (e) {
        res.json(e)
    }
}

const updateAttendance = async (req, res) => {
    try {
        let user = await UserModel.findOne({ token: req.cookies.user }).populate('role')
        if (user.role.name == 'teacher') {
            let attendance = await UserModel.updateOne({
                attend: req.body.attend,
            })
            res.json({ status: 200, data: attendance })
        } else {
            res.json({ status: 400, message: "user not found" })
        }
    } catch (e) {
        res.json(e)
    }
}

const viewAttendance = async (req, res) => {
    try {
        let user = await UserModel.findOne({ token: req.cookies.user }).populate('role')
        let attendance = await attendanceModel.find()
        if (user.role.name == "student") {
            let userAtten = []
            for (let i = 0; i < attendance.length; i++) {
                for (let j = 0; j < attendance[i].attend.length; i++) {
                    if (user.id == attendance[i].attend[j]) {
                        // userAtten.push(attendance[i])
                        let attend = await Class_slotModel.findOne({ id: attendance[i].class_slot }).populate('classID')
                        userAtten.push(attend)
                    }
                }
            }
            res.json({ status: 200, data: userAtten })
        } else if (user.role.name == 'parent') {
            let user = await UserModel.findOne({ token: req.cookies.user }).populate('child')
            let userAtten = []
            for (let i = 0; i < attendance.length; i++) {
                for (let j = 0; j < attendance[i].attend.length; i++) {
                    if (user.child.id == attendance[i].attend[j]) {
                        // userAtten.push(attendance[i])
                        let attend = await Class_slotModel.findOne({ id: attendance[i].class_slot }).populate('classID')
                        userAtten.push(attend)
                    }
                }
            }
            res.json({ status: 200, data: userAtten })
        } else {
            // let class1 = await ClassModel.findOne({ id: user.class })
            let userAtten = await attendanceModel.find({ classID: user.class }).populate('class_slot').populate('slotID')
            res.json({ status: 200, data: userAtten })
        }
    } catch (e) {
        res.json(e)
    }
}


module.exports = {viewAttendance, updateAttendance, createAttendance}