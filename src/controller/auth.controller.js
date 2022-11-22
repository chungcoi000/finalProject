const UserModel = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const RoleModel = require("../model/role.model");

// login
async function login(req, res) {
  try {
    // console.log(req.body.href);
    const data = await UserModel.findOne({
      email: req.body.email,
    });
    if (data) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        data.password
      );
      if (checkPassword) {
        const token = jwt.sign(`${data._id}`, "token");
        await UserModel.updateOne(
          { _id: data._id },
          { token: token }
        );
        res.cookie("user", token, {
          expires: new Date(Date.now() + 9000000),
        });
        res.json({ data: data });
      } else {
        res.json({ message: " Incorrect password" });
      }
    } else {
      res.json({ message: "Login failed", status: 400, err: false });
    }
  } catch (err) {
    res.json(76, err);
  }
}


// register
async function register(req, res) {
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      res.json({
        status: 400,
        message: 'Email is already existed',
      })
    } else {
      const password = await bcrypt.hash(req.body.password, 10);
      let newUser = await UserModel.create({
        email: req.body.email,
        password: password,
        name: req.body.name,
        dob: req.body.dob,
        class: req.body.class,
        phone: req.body.phone,
        gender: req.body.gender,
        role: "admin",
      });

      res.json({
        message: "Register successful",
        status: 200,
      });
    }

  } catch (err) {
    res.json(err);
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie("user");
    res.json({
      status: 200,
      message: "Logout successful"
    })
  } catch (error) {
    console.log(251, error);
  }
}

module.exports = { login, register, logout }