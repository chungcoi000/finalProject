const UserModel = require('../model/user.model');
const RoleModel = require('../model/role.model');
const ClassModel = require("../model/class.model");
const UnitModel = require("../model/unit.model");

const getTeachers = async (req, res) => {
  try {
    let role = await RoleModel.findOne({name: 'teacher'})
    let teacher = await UserModel.find({role: role.id}).skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    let allTeachers = await UserModel.find({role: role.id})
    let total = Math.ceil(allTeachers.length / teacher.length);
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
    let data = [nextPage, prePage, total, page]
    if (!teacher) {
      res.json('khong co user ton tai')
    } else {
      res.json({status: 200, data: teacher, pagination: data})
    }
  } catch (e) {
    console.log(e);
  }
}


async function getStudents(req, res) {
  try {
    let role = await RoleModel.findOne({name: 'student'})
    let Students = await UserModel.find({role: role.id}).skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    let allStudents = await UserModel.find({role: role.id})
    let total = Math.ceil(allStudents.length / Students.length);
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
    let data = [nextPage, prePage, total, page]
    if (!Students) {
      res.json('khong co user ton tai')
    } else {
      res.json({status: 200, data: Students, pagination: data})
    }
  } catch (e) {
    console.log(e);
  }
}

async function viewParents(req, res) {
  try {
    let role = await RoleModel.findOne({name: 'parent'});
    let Parents = await UserModel.find({role: role.id}).skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    let allParents = await UserModel.find({role: role.id})
    let total = Math.ceil(allParents.length / Parents.length);
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
    let data = [nextPage, prePage, total, page]
    if (!Parents) {
      res.json('No user are existed');
    } else {
      res.json({status: 200, data: Parents, pagination: data});
    }
  } catch (e) {
    console.log(e);
  }
}

const addUser = async (req, res) => {
  try {
    let user = await UserModel.findOne({phone: req.body.phone});
    let role = await RoleModel.findOne({name: req.body.role});
    if (user) {
      res.json({status: 400, message: 'User is already existed!'});
    } else {
      if (role.name === 'teacher') {
        let newUser = await UserModel.create({
          name: req.body.name,
          dob: req.body.dob,
          identityNumber: req.body.identityNumber,
          role: req.body.role,
          class: req.body.class,
          address: req.body.address,
          phone: req.body.phone,
          subject: req.body.subject,
          gender: req.body.gender,
        })
        res.json({status: 200, message: 'Create user successful', data: newUser})

      } else if (role.name === 'student') {
        let newUser = await UserModel.create({
          name: req.body.name,
          dob: req.body.dob,
          identityNumber: req.body.identityNumber,
          role: req.body.role,
          class: req.body.class,
          address: req.body.address,
          phone: req.body.phone,
          subject: req.body.subject,
          gender: req.body.gender,
        })
        res.json({status: 200, message: 'Create user successful', data: newUser})

      } else {
        let newUser = await UserModel.create({
          name: req.body.name,
          dob: req.body.dob,
          identityNumber: req.body.identityNumber,
          role: req.body.role,
          child: req.body.child,
          address: req.body.address,
          phone: req.body.phone,
          subject: req.body.subject,
          gender: req.body.gender,
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
    let User = await UserModel.findOne({id: req.params.id});
    let role = await RoleModel.findOne({id: User.role});
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
          unit = await UnitModel.findOne({_id: classS.unitID})
        } else {
          res.json({status: 404, message: 'Student not found'})
        }
      } else if (role.name === 'teacher') {
        let arr = []
        for (let i = 0; i < classUser.length; i++) {
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
          classS = classS.push(classUser[index[i]]);
        }

        unit = await UnitModel.findOne({_id: classS.unitID})
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
          unit = await UnitModel.findOne({_id: classS.unitID})
        } else {
          res.json({status: 404, message: 'Parent not found'})
        }
      }
      res.json({status: 200, data: User, class: classS, unit: unit})
    } else {
      res.json({status: 404, message: "Teacher not found"})
    }
  } catch (e) {
    console.log(e);
  }
}

const updateUser = async (req, res) => {
  try {
    let User = await UserModel.findOne({id: req.params.id})
    if (User) {
      let role = await RoleModel.findOne({id: User.role})
      if (role.name === 'teacher') {
        let updateUser1 = await UserModel.updateOne({
          phone: req.body.phone,
          class: req.body.class,
        })
        res.json({status: 200, data: updateUser1, message: "Update user successful"})
      } else if (role.name === 'student') {
        let updateUser1 = await UserModel.updateOne({
          name: req.body.name,
          dob: req.body.dob,
          role: req.body.role,
          class: req.body.class,
          phone: req.body.phone,
          subject: req.body.subject,
          address: req.body.address,
          identityNumber: req.body.identityNumber,
          gender: req.body.gender
        })
        res.json({status: 200, data: updateUser1, message: "Update user successful"})
      } else {
        let updateUser1 = await UserModel.create({
          name: req.body.name,
          dob: req.body.dob,
          role: req.body.role,
          child: req.body.child,
          phone: req.body.phone,
          address: req.body.address,
          identityNumber: req.body.identityNumber,
          gender: req.body.gender,
        })
        res.json({status: 200, data: updateUser1, message: "Update user successful"})
      }
    } else {
      res.json({status: 404, message: "User not found"});
    }
  } catch (e) {
    console.log(e);
    res.json({status: 404, message: "Something error"});
  }
}

const deleteUser = async (req, res) => {
  try {
    let user = await UserModel.findOne({id: req.params.id})
    if (user) {
      let deleteUser = await UserModel.findOneAndDelete({_id: user._id})
      let role = await RoleModel.findOne({_id: deleteUser._id})
      let user = await UserModel.find({role: role.id})
      res.json({statusbar: 200, message: 'Delete user successful', data: user})
    } else {
      res.json({status: 404, message: "User not found"});
    }
  } catch (e) {
    console.log(e);
    res.json({status: 404, message: "Something error"});
  }
}


module.exports = {viewParents, addUser, updateUser, getTeachers, getUser, deleteUser, getStudents}