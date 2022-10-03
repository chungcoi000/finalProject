const router = require('express').Router();
const UserModel = require('../model/user.model');

async function viewProfile(req, res) {
    try {
        let tokken = req.cookies;
        let user = await UserModel.findOne({ tokken: tokken.user })
        if (user) {
            res.json({ status: 200, Message: 'Success', user: user })
        } else {
            res.json({ status: 404, Message: 'User not found' })
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = { viewProfile }