// const router = require('express').Router();
const ClassModel = require('../model/class.model');
const slug = require('slugify');
const UnitModel = require('../model/unit.model');
const UserModel = require("../model/user.model");

const getClasses = async (req, res) => {
  try {
    let classes = await ClassModel.find()
    let class1 = await ClassModel.find().skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit).populate("unit").populate("formTeacher");
    let total = 0;
    if (Math.ceil(classes.length / 10) == null) {
      total = Math.ceil(classes.length / 10);
    }
    let nextPage, prePage
    let page = req.query.page
    if (req.query.page == total && req.query.page == 1) {
      nextPage = false
      prePage = false
    } else if (req.query.page >= total) {
      nextPage = false
      prePage = true
    } else if (req.query.page <= total) {
      nextPage = true
      prePage = false
    } else {
      nextPage = true
      prePage = true
    }
    let data = {nextPage: nextPage, prePage: prePage, total: classes.length, page: page}

    if (!class1) {
      res.json({status: 404, message: "No class found!"})
    } else {
      res.json({status: 200, data: class1, pagination: data})
    }
  } catch (e) {
    console.log(e);
  }
}

const addClass = async (req, res) => {
  try {
    let classs = await ClassModel.findOne({name: req.body.name})
    if (classs) {
      res.json({status: 400, message: 'Class is already existed'})
    } else {
      let teacher = await ClassModel.findOne({formTeacher: req.body.formTeacher})
      if (teacher) {
        res.json({status: 400, message: 'This teacher is already a form teacher in other class'})
      } else {
        let Class = await ClassModel.create({
          name: req.body.name,
          unit: req.body.unit,
          student: [],
          formTeacher: req.body.formTeacher,
          slug: slug(req.body.name)
        })
        let newClass = await ClassModel.findOne({name: Class.name}).populate("unit").populate("formTeacher")
        res.json({status: 200, message: 'Created class successful', data: newClass})
      }
    }
  } catch (e) {
    console.log(e);
  }
}

const getClass = async (req, res) => {
  try {
    let class1 = await ClassModel.findOne({_id: req.params.id}).populate("formTeacher").populate("student").populate("unit");
    if (class1) {
      res.json({status: 200, data: class1})
    } else {
      res.json({status: 404, message: "Class not found"})
    }
  } catch (e) {
    console.log(e);
  }
}

const updateClass = async (req, res) => {
  try {
    let class1 = await ClassModel.findOne({_id: req.params.id})
    if (class1) {
      let teacher = await ClassModel.findOne({formTeacher: req.body.formTeacher})
      if (teacher) {
        res.json({status: 400, message: 'This teacher is already a form teacher in other class'})
      } else {
        await ClassModel.updateOne({
          name: req.body.name,
          unit: req.body.unit,
          formTeacher: req.body.formTeacher,
          slug: slug(req.body.name)
        });
        let newClass = await ClassModel.findOne({_id: req.params.id}).populate("formTeacher").populate("unit");
        res.json({status: 200, message: "Update class successful", data: newClass});
      }
    } else {
      res.json({status: 404, message: "Class not found"});
    }
  } catch (e) {
    console.log(e);
  }
}

const deleteClass = async (req, res) => {
  try {
    let class1 = await ClassModel.findOne({_id: req.params.id})
    if (class1) {
      let deleteClass = await ClassModel.findOneAndDelete({_id: class1._id})
      res.json({statusbar: 200, message: 'Delete class successful', data: deleteClass})
    } else {
      res.json({status: 404, message: "Class not found"})
    }
  } catch (e) {
    console.log(e);
  }
}

const getClassByUnit = async (req, res) => {
  try {
    let unit = await UnitModel.findOne({name: req.query.name});
    if (unit) {
      let classByUnit = await ClassModel.find({unit: unit.id});
      res.json({status: 200, data: classByUnit});
    } else {
      res.json({status: 200, message: 'Unit do not existed'});
    }
  } catch (e) {
    res.json(e)
  }
}

const updateStudentToClass = async (req, res) => {
  try {
    let classs = await ClassModel.findOne({_id: req.body.id})
    if (!classs) {
      res.json({status: 400, message: 'Class not found'})
    } else {
      for (let i = 0; i < req.body.student.length; i++) {
        let currentClass = await ClassModel.findOne({student: req.body.student[i]});
        if (currentClass) return res.json({status: 400, message: "Student is already in other class"});
      }
      let Class = await ClassModel.findByIdAndUpdate({_id: classs.id}, {
        student: req.body.student,
      })
      let newClass = await ClassModel.findOne({_id: Class.id}).populate("student");
      res.json({status: 200, message: 'Update Student successful', data: newClass})
    }
  } catch (e) {
    res.json(e)
  }
}

const getUserClass = async (req, res) => {
  try {
    let token = req.cookies;
    let user = await UserModel.findOne({token: token.user});
    if (!user) {
      res.json({status: 404, message: 'User not found'})
    }
    if (user?.role === "teacher") {
      let teacherClass = await ClassModel.findOne({formTeacher: user._id}).populate("formTeacher").populate("student");
      res.json({status: 200, message: 'Success', data: teacherClass});
    }

    if (user?.role === "student") {
      let teacherClass = await ClassModel.findOne({student: user._id}).populate("formTeacher").populate("student");
      if (teacherClass !== null) {
        res.json({status: 200, message: 'Success', data: teacherClass});
      } else {
        res.json({status: 400, message: 'No class found'});
      }
    }

    if (user?.role === "parent") {
      let teacherClass = await ClassModel.findOne({student: user?.child}).populate("formTeacher").populate("student");
      if (teacherClass !== null) {
        res.json({status: 200, message: 'Success', data: teacherClass});
      } else {
        res.json({status: 400, message: 'No class found'});
      }
    }
  } catch (e) {
    res.json(e)
  }
}


module.exports = {
  getClassByUnit,
  deleteClass,
  updateClass,
  getClass,
  addClass,
  getClasses,
  updateStudentToClass,
  getUserClass
}