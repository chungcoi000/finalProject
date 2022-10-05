const UserModel = require('../model/user.model');

const getTeachers = async (req, res) => {
  try {
    let teacher = await UserModel.find()
    res.json({status: 200, data: teacher})
  } catch (e) {
    console.log(e);
  }
}

const addTeacher = async (req, res) => {
  try {
    let teacher = await UserModel.findOne({phone: req.body.phone})
    if (teacher) {
      res.json({status: 400, message: 'Teacher is already existed!'})
    } else {
      let teacher = await UserModel.create({
        name: req.body.name,
        dob: req.body.dob,
        role: req.body.role,
        class: req.body.class,
        phone: req.body.phone,
        subject: req.body.subject,
        gender: req.body.gender,
      })
      res.json({status: 200, message: 'Create teacher successful', data: teacher})
    }
  } catch (e) {
    console.log(e);
  }
}

const getTeacher = async (req, res) => {
  try {
    let teacher = await UserModel.findOne({id: req.params.id});
    if (teacher) {
      res.json({status: 200, data: teacher})
    } else {
      res.json({status: 404, message: "Teacher not found"})
    }
  } catch (e) {
    console.log(e);
  }
}

const updateTeacher = async (req, res) => {
  try {
    let teacher = await UserModel.findOne({id: req.params.id})
    if (teacher) {
      let newTeacher = await UserModel.updateOne({
        phone: req.body.phone,
        class: req.body.class,
      })
      res.json({status: 200, data: newTeacher, message: "Update teacher successful"})
    } else {
      res.json({status: 404, message: "Teacher not found"});
    }
  } catch (e) {
    console.log(e);
    res.json({status: 404, message: "Something error"});
  }
}

const deleteTeacher = async (req, res) => {
  try {
    let teacher = await UserModel.findOne({id: req.params.id})
    if (teacher) {
      let deleteTeacher = await UserModel.deleteOne({_id: teacher._id})
      res.json({statusbar: 200, message: 'Delete teacher successful', data: deleteTeacher})
    } else {
      res.json({status: 404, message: "Teacher not found"})
    }
  } catch (e) {
    console.log(e);
  }
}


module.exports = {deleteTeacher, updateTeacher, getTeachers, addTeacher, getTeacher}