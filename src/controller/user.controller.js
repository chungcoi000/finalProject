const UserModel = require('../model/user.model');
const RoleModel = require("../model/role.model");
const ClassModel = require("../model/class.model");
const UnitModel = require("../model/unit.model");
const bcrypt = require("bcrypt");
const Class_slotModel = require("../model/class_slot.model");

const getTeachers = async (req, res) => {
  try {
    let role = await RoleModel.findOne({name: 'teacher'})
    let teacher = await UserModel.find({role: role.name}).skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    let allTeachers = await UserModel.find({role: role.name})
    let total = 0;
    if (Math.ceil(allTeachers.length / 10) === null) {
      total = Math.ceil(allTeachers.length / 10);
    }
    let nextPage, prePage;
    let page = req.query.page;
    if (req.query.page >= total && req.query.page <= total) {
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
    let data = {nextPage: nextPage, prePage: prePage, total: allTeachers.length, page: page}
    res.json({status: 200, data: teacher, pagination: data})
  } catch (e) {
    console.log(e);
  }
}


async function getStudents(req, res) {
  try {
    let role = await RoleModel.findOne({name: 'student'});
    let Students = await UserModel.find({role: role.name}).skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    let allStudents = await UserModel.find({role: role.name});
    let total = 0;
    if (Math.ceil(allStudents.length / 10) > 0) {
      total = Math.ceil(allStudents.length / 10);
    }
    let nextPage, prePage
    let page = req.query.page
    if (req.query.page >= total && req.query.page <= total) {
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
    let data = {nextPage: nextPage, prePage: prePage, total: allStudents.length, page: page}
    res.json({status: 200, data: Students, pagination: data})
  } catch (e) {
    console.log(e);
  }
}

async function viewParents(req, res) {
  try {
    let role = await RoleModel.findOne({name: 'parent'});
    let Parents = await UserModel.find({role: role.name}).skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    let allParents = await UserModel.find({role: role.name})
    let total = 0;
    if (Math.ceil(allParents.length / 10) > 0) {
      total = Math.ceil(allParents.length / 10);
    }
    let nextPage, prePage;
    let page = req.query.page
    if (req.query.page >= total && req.query.page <= total) {
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
    let data = {nextPage: nextPage, prePage: prePage, total: allParents.length, page: page}
    res.json({status: 200, data: Parents, pagination: data});
  } catch (e) {
    console.log(e);
  }
}

const addUser = async (req, res) => {
  try {
    let user = await UserModel.findOne({email: req.body.email})
    let role = await RoleModel.findOne({name: req.body.role})
    const password = await bcrypt.hash(req.body.password, 8);
    if (user) {
      res.json({status: 400, message: 'email is already used!'})
    } else {
      if (role.name === 'teacher') {
        let newUser = await UserModel.create({
          email: req.body.email,
          password: password,
          name: req.body.name,
          dob: req.body.dob,
          role: 'teacher',
          class: req.body.class,
          subject: req.body.subject,
          phone: req.body.phone,
          identityNumber: req.body.identityNumber,
          address: req.body.address,
          gender: req.body.gender,
        })
        res.json({status: 200, message: 'Create user successful', data: newUser})
      } else if (role.name === 'student') {
        let newUser = await UserModel.create({
          email: req.body.email,
          password: password,
          name: req.body.name,
          dob: req.body.dob,
          role: 'student',
          subject: req.body.subject,
          gender: req.body.gender,
          phone: req.body.phone,
          identityNumber: req.body.identityNumber,
          address: req.body.address,
          unit: req.body.unit
        })
        res.json({status: 200, message: 'Create user successful', data: newUser})
      } else {
        let newUser = await UserModel.create({
          name: req.body.name,
          dob: req.body.dob,
          email: req.body.email,
          password: password,
          role: 'parent',
          child: req.body.child,
          subject: req.body.subject,
          gender: req.body.gender,
          phone: req.body.phone,
          identityNumber: req.body.identityNumber,
          address: req.body.address,
        })
        res.json({status: 200, message: 'Create user successful', data: newUser})
      }
    }
  } catch (e) {
    console.log(e);
  }
}

const getUser = async (req, res) => {
  try {
    let User = await UserModel.findOne({_id: req.params.id}).populate("unit").populate("subject");
    res.json({status: 200, data: User});
  } catch (e) {
    console.log(e);
  }
}

const updateUser = async (req, res) => {
  try {
    let User = await UserModel.findOne({_id: req.params.id});
    if (User) {
      let role = await RoleModel.findOne({name: User.role});
      if (role.name === 'teacher') {
        await UserModel.findOneAndUpdate({_id: req.params.id}, {
          name: req.body.name,
          gender: req.body.gender,
          dob: req.body.dob,
          subject: req.body.subject,
          identityNumber: req.body.identityNumber,
          address: req.body.address,
          phone: req.body.phone,
        })
      } else if (role.name === 'student') {
        await UserModel.findOneAndUpdate({_id: req.params.id}, {
          name: req.body.name,
          dob: req.body.dob,
          identityNumber: req.body.identityNumber,
          unit: req.body.unit,
          address: req.body.address,
          phone: req.body.phone,
          gender: req.body.gender
        });
      } else {
        await UserModel.findOneAndUpdate({_id: req.params.id}, {
          name: req.body.name,
          dob: req.body.dob,
          identityNumber: req.body.identityNumber,
          child: req.body.child,
          address: req.body.address,
          phone: req.body.phone,
          gender: req.body.gender,
        })
      }
      let user1 = await UserModel.findOne({_id: req.params.id}).populate("unit").populate("subject");
      res.json({status: 200, data: user1, message: "Update user successful"});
    } else {
      res.json({status: 404, message: "User not found"});
    }
  } catch (e) {
    console.log(e);
    res.json({status: 404, message: "Update user failed!"});
  }
}

const deleteUser = async (req, res) => {
  try {
    let user = await UserModel.findOne({_id: req.params.id})
    if (user) {
      let deleteUser = await UserModel.findOneAndDelete({_id: user.id})
      res.json({status: 200, message: 'Delete user successful', data: deleteUser});
    } else {
      res.json({status: 404, message: "User not found"});
    }
  } catch (e) {
    console.log(e);
    res.json({status: 404, message: "Something error"});
  }
}

//search
const searchUser = async (req, res) => {
  try {
    if (req.query.role == 'teacher') {
      let role = await RoleModel.findOne({name: 'teacher'});
      let user = await UserModel.find({
        name: {$regex: req.query.name, $options: 'i'},
        role: role.name
      })
      res.json({status: 200, data: user})
    } else if (req.query.role == 'student') {
      let role = await RoleModel.findOne({name: 'student'})
      let user = await UserModel.find({
        name: {$regex: req.query.name, $options: 'i'},
        role: role.name
      })
      res.json({status: 200, data: user})
    }
  } catch (e) {
    console.log(e);
  }
}

const updateUserAvatar = async (req, res) => {
  try {
    let userInfo = await UserModel.findOne({token: req.cookies.user})
    let path
    if (req.file == undefined) {
      path = userInfo.avatar
    } else {
      path = req.file.path;
    }
    let user = await UserModel.findByIdAndUpdate({_id: userInfo.id}, {avatar: path})
    res.json({status: 200, data: user, message: "Upload avatar successful"});
  } catch (error) {
    res.status(500).json(error)
  }
}

async function getUserByClass(req, res) {
  try {
    let class1 = await ClassModel.findOne({_id: req.params.id})
    let students = []
    for (let i = 0; i < class1.student.length; i++) {
      let student = await UserModel.findOne({_id: class1.student[i]})
      students.push(student)
    }
    res.json({status: 200, data: students})

  } catch (e) {
    res.json(e)
  }
}

async function getUserByUnit(req, res) {
  try {
    if (req.query?.name) {
      let students = await UserModel.find({
        unit: req.params.id,
        name: {$regex: req.query.name, $options: 'i'},
      }).populate("unit");
      res.json({status: 200, data: students})
    } else {
      let students = await UserModel.find({
        unit: req.params.id,
      }).populate("unit");
      res.json({status: 200, data: students})
    }
  } catch (e) {
    res.json(e)
  }
}

async function getTeacherBySubject(req, res) {
  try {
    let teachers = await UserModel.find({subject: req.params.id})
    res.json({status: 200, data: teachers})
  } catch (e) {
    res.json(e)
  }
}

async function getTeacherByClass(req, res) {
  try {
    let class1 = await Class_slotModel.find({classID: req.params.id}).populate('teacherID')
    res.json({status: 200, data: class1})
  } catch (e) {
    res.json(e)
  }
}

async function getUserClass(req, res) {
  try {
    let student = await UserModel.findOne({token: req.cookies.user})
    let class12 = await ClassModel.find({unitID: student.unit})
    let class1
    for (let i = 0; i < class12.length; i++) {
      for (let j = 0; j < class12[i].student.length; j++) {
        if (student.id == class12[i].student[j].id) {
          class1 = class12[i]
        }
      }
    }
    res.json({status: 200, data: {student: student, class: class1}})
  } catch (e) {
    res.json(e)
  }
}

module.exports = {
  searchUser,
  viewParents,
  addUser,
  updateUser,
  getTeachers,
  getUser,
  deleteUser,
  getStudents,
  updateUserAvatar,
  getUserByClass,
  getUserByUnit,
  getTeacherBySubject,
  getTeacherByClass
}