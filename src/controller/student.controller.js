const router = require('express').Router();
const UserModel = require('../model/user.model');

async function viewStudents(req, res) {
  try {
    let Students = await UserModel.find()
    res.json({status: 200, data: Students})
  } catch (e) {
    console.log(e);
  }
}


async function createStudents(req, res) {
  try {
    let Student = await UserModel.create({
      name: req.body.name,
      dob: req.body.dob,
      role: req.body.role,
      class: req.body.class,
      phone: req.body.phone,
      subject: req.body.subject,
      gender: req.body.gender,
    })
    res.json({status: 200, message: 'Create student successfully', data: Student})

  } catch (e) {
    console.log(e);
  }
}

async function viewStudent(req, res) {
  try {
    let Student = await UserModel.findOne({id: req.params.id});
    if (Student) {
      res.json({status: 200, data: Student})
    } else {
      res.json({status: 404, message: "Student not found"})
    }
  } catch (e) {
    console.log(e);
  }
}

async function updateStudent(req, res) {
  try {
    let Student = await UserModel.findOne({id: req.params.id})
    if (Student) {
      let newStudents = await UserModel.updateOne({
        name: req.body.name,
        dob: req.body.dob,
        role: req.body.role,
        class: req.body.class,
        phone: req.body.phone,
        subject: req.body.subject,
        gender: req.body.gender,
      })
      res.json({status: 200, message: "Update student successful", data: newStudents})
    } else {
      res.json({status: 404, message: "Students not found"});
    }
  } catch (e) {
    console.log(e);
  }
}

async function deleteStudents(req, res) {
  try {
    let Student = await UserModel.findOne({id: req.params.id})
    if (Student) {
      let deleteStudent = await UserModel.deleteOne({_id: Student._id})
      res.json({statusbar: 200, message: ' Delete student successful', data: deleteStudent})
    } else {
      res.json({status: 404, message: "Students not found"})
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {deleteStudents, updateStudent, viewStudent, createStudents, viewStudents}