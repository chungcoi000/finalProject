const router = require('express').Router();
const UserModel = require('../model/user.model');

async function viewParents(req, res) {
  try {
    let Parents = await UserModel.find()
    res.json({status: 200, data: Parents})
  } catch (e) {
    console.log(e);
  }
}

async function createParents(req, res) {
  try {
    let Parents = await UserModel.findOne({phone: req.body.phone})
    if (Parents) {
      res.json({status: 400, message: 'Parents da ton tai'})
    } else {
      let Student = await UserModel.create({
        name: req.body.name,
        dob: req.body.dob,
        role: req.body.role,
        child: req.body.child,
        phone: req.body.phone,
        subject: req.body.subject,
        gender: req.body.gender,
      })
      res.json({status: 200, message: 'created successfully', data: Student})
    }
  } catch (e) {
    console.log(e);
  }
}

async function viewUpdateParents(req, res) {
  try {
    let Parents = await UserModel.findOne({id: req.params.id});
    if (Parents) {
      res.json({status: 200, data: Parents})
    } else {
      res.json({status: 404, message: "Parents not found"})
    }
  } catch (e) {
    console.log(e);
  }
}

async function updateParents(req, res) {
  try {
    let Parents = await UserModel.findOne({id: req.params.id})
    if (Parents) {
      let newParents = await UserModel.updateOne({
        phone: req.body.phone,
        class: req.body.class,
      })
      res.json({status: 200, message: "Update parent successful", data: newParents})
    } else {
      res.json({status: 404, message: "Parents not found"});
    }
  } catch (e) {
    console.log(e);
  }
}

async function deleteParents(req, res) {
  try {
    let Parents = await UserModel.findOne({id: req.params.id})
    if (Parents) {
      let deleteParents = await UserModel.deleteOne({_id: Parents._id})
      res.json({statusbar: 200, message: ' Delete parent successful', data: deleteParents})
    } else {
      res.json({status: 404, message: "Parents not found"})
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {deleteParents, updateParents, viewUpdateParents, createParents, viewParents}