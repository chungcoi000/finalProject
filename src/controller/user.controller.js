const UserModel = require('../model/user.model');
const RoleModel = require("../model/role.model");
const ClassModel = require("../model/class.model");
const UnitModel = require("../model/unit.model");
const bcrypt = require("bcrypt");

const getTeachers = async (req, res) => {
  try {
    let role = await RoleModel.findOne({ name: 'teacher' })
    let teacher = await UserModel.find({ role: role.id }).skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    let allTeachers = await UserModel.find({ role: role.id })
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
    if (!teacher) {
      res.json('khong co user ton tai')
    } else {
      res.json({ status: 200, data: teacher, pagination: data })
    }
  } catch (e) {
    console.log(e);
  }
}


async function getStudents(req, res) {
  try {
    let role = await RoleModel.findOne({ name: 'student' })
    let Students = await UserModel.find({ role: role.id }).skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    let allStudents = await UserModel.find({ role: role.id });
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
    res.json({ status: 200, data: Students, pagination: data })
  } catch (e) {
    console.log(e);
  }
}

async function viewParents(req, res) {
  try {
    let role = await RoleModel.findOne({ name: 'parent' });
    let Parents = await UserModel.find({ role: role.id }).skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    let allParents = await UserModel.find({ role: role.id })
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
    res.json({ status: 200, data: Parents, pagination: data });
  } catch (e) {
    console.log(e);
  }
}

const addUser = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    let role = await RoleModel.findOne({ name: req.body.role })
    const password = await bcrypt.hash(req.body.password, 8);
    if (user) {
      res.json({ status: 400, message: 'email is already used!' })
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
        res.json({ status: 200, message: 'Create user successful', data: newUser })
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
        res.json({ status: 200, message: 'Create user successful', data: newUser })
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
        res.json({ status: 200, message: 'Create user successful', data: newUser })
      }
    }
  } catch (e) {
    console.log(e);
  }
}

const getUser = async (req, res) => {
  try {
    let User = await UserModel.findOne({ id: req.params.id });
    let role = await RoleModel.findOne({ id: User.role })
    let unit, classS
    if (User) {
      let classUser = await ClassModel.find()
      if (role.name === 'student') {
        if (classUser) {
          let arr = []
          for (let i = 0; i < classUser.length; i++) {
            arr = arr.push(classUser[i].student)
          }
          let index
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
              if (User.id === arr[i][j]) {
                index = i
              }
            }
          }
          classS = classUser[index]
          unit = await UnitModel.findOne({ _id: classS.unitID })
        } else {
          res.json({ status: 404, message: 'Student not found' })
        }
      } else if (role.name === 'teacher') {
        let arr = []
        for (let i = 0; i < classUser.lenth; i++) {
          arr = arr.push(classUser[i].formTeacher)
        }
        let index = []
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr[i].length; j++) {
            if (User.id === arr[i][j]) {
              index = index.push(i)
            }
          }
        }
        let classS = []
        for (let i = 0; i < index.length; i++) {
          if (User.class !== classUser[index[i]]) {
            classS = classS.push(User.class)
          }
          classS = classS.push(classUser[index[i]])
        }

        unit = await UnitModel.findOne({ _id: classS.unitID })
      } else if (role.name === 'parent') {
        if (classUser) {
          let arr = []
          for (let i = 0; i < classUser.length; i++) {
            arr = arr.push(classUser[i].student)
          }
          let index
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
              if (User.child === arr[i][j]) {
                index = i
              }
            }
          }
          classS = classUser[index]
          unit = await UnitModel.findOne({ _id: classS.unitID })
        } else {
          res.json({ status: 404, message: 'Student not found' })
        }
      }

      classS = classUser[index]
      unit = await UnitModel.findOne({ _id: classS.unitID })
    } else {
      res.json({ status: 404, message: 'Parent not found' })
    }
  } catch (e) {
    console.log(e);
  }
}

const updateUser = async (req, res) => {
  try {
    let User = await UserModel.findOne({ id: req.params.id })
    if (User) {
      let role = await RoleModel.findOne({ id: User.role })
      if (role.name === 'teacher') {
        let updateUser1 = await UserModel.updateOne({
          name: req.body.name,
          gender: req.body.gender,
          identityNumber: req.body.identityNumber,
          address: req.body.address,
          phone: req.body.phone,
          class: req.body.class,
        })
        res.json({ status: 200, data: updateUser1, message: "Update teacher successful" })
      } else if (role.name === 'student') {
        let updateUser1 = await UserModel.updateOne({
          name: req.body.name,
          dob: req.body.dob,
          identityNumber: req.body.identityNumber,
          address: req.body.address,
          phone: req.body.phone,
          gender: req.body.gender
        })
        res.json({ status: 200, data: updateUser1, message: "Update teacher successful" })

      } else {
        let updateUser1 = await UserModel.create({
          name: req.body.name,
          dob: req.body.dob,
          child: req.body.child,
          phone: req.body.phone,
          gender: req.body.gender,
        })
        res.json({ status: 200, data: updateUser1, message: "Update teacher successful" })
      }
    } else {
      res.json({ status: 404, message: "User not found" });
    }
  } catch (e) {
    console.log(e);
    res.json({ status: 404, message: "Something error" });
  }
}

const deleteUser = async (req, res) => {
  try {
    let user = await UserModel.findOne({ id: req.params.id })
    if (user) {
      let deleteUser = await UserModel.findOneAndDelete({ _id: user._id })
      let role = await RoleModel.findOne({ _id: deleteUser._id })
      let user = await UserModel.find({ role: role.id })
      res.json({ statusbar: 200, message: 'Delete user successful', data: user })
    } else {
      res.json({ status: 404, message: "User not found" });
    }
  } catch (e) {
    console.log(e);
    res.json({ status: 404, message: "Something error" });
  }
}

//search
const search = async (req, res) => {
  try {
    let user
    let class12 = []
    // khi co name va unit
    if (req.query.name != "" && req.query.unit != "") {
      let unit = await UnitModel.findOne({ name: req.query.unit })
      let class1 = await ClassModel.find({ unitID: unit._id })
      for (let i = 0; i < class1.length; i++) {
        let user = await UserModel.find({ name: req.query.name, class: class1[i].id })
        class12.push(user)
      }
      res.json({ status: 200, data: class12 })
      // khi co name va class
    } else if (req.query.name != "" && req.query.class != "") {
      let class1 = await ClassModel.findOne({ name: req.query.class })
      user = class1.student
      for (let i = 0; i < class1.student.length; i++) {
        if (req.query.name == class1.student[i]) {
          user = await UserModel.findOne({ id: class1.student[i] })
        }
        res.json({ status: 200, data: user })
      }
      // khi co minh class
    } else if (req.query.class != "") {
      let class1 = await ClassModel.findOne({ name: req.query.class })
      for (let i = 0; i < class1.length; i++) {
        user = await UserModel.findOne({ id: class1[i] })
        class12.push(user)
      }
      res.json({ status: 200, data: class12 })
    } else {
      // khi chi co name va role
      if (req.body.role == "teacher") {
        user = await UserModel.find({ name: req.query.name, role: "teacher" })
      } else {
        user = await UserModel.find({ name: req.query.name, role: "student" })
      }
      res.json({ status: 200, data: user })
    }
  } catch (e) {
    console.log(e);
  }
}


const updateUserAvatar = async (req, res) => {
  try {
    let userInfo = await UserModel.findOne({ token: req.cookies.user })
    // console.log(userInfo.avatar);
    let path
    if (req.file == undefined) {
      path = userInfo.avatar
    } else {
      path = req.file.path;
    }
    let user = await UserModel.findByIdAndUpdate({ _id: userInfo.id }, { avatar: path })
    res.json({ status: 200, data: user })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = { search, viewParents, addUser, updateUser, getTeachers, getUser, deleteUser, getStudents, updateUserAvatar }