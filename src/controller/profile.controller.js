const router = require('express').Router();
const UserModel = require('../model/user.model');

async function viewProfile(req, res) {
  try {
    let token = req.cookies;
    let user = await UserModel.findOne({token: token.user})
    if (user) {
      res.json({status: 200, user: user})
    } else {
      res.json({status: 404, message: 'User not found'})
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {viewProfile}