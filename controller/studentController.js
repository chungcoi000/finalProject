const router = require('express').Router();
const UserModel = require('../model/user.model');



async function viewStudents(req, res) {
    try {
        let Students = await UserModel.find()
        res.json({ status: 200, data: Students })
    } catch (e) {
        console.log(e);
    }
}


async function createStudents(req, res) {
    try {
        let Students = await UserModel.findOne({ phone: req.body.phone })
        if (Students) {
            res.json({ status: 400, message: 'Students da ton tai' })
        } else {
            let Student = await UserModel.create({
                name: req.body.name,
                dob: req.body.dob,
                role: req.body.role,
                class: req.body.class,
                phone: req.body.phone,
                subject: req.body.subject,
                gender: req.body.gender,
            })
            res.json({ status: 200, message: 'created successfully', data: Student })
        }
    } catch (e) {
        console.log(e);
    }
}

async function viewUpdateStudents(req, res) {
    try {
        let Students = await UserModel.findOne({ id: req.params.id });
        if (Students) {
            res.json({ status: 200, data: Students })
        } else {
            res.json({ status: 404, message: "Students not found" })
        }
    } catch (e) {
        console.log(e);
    }
}

async function updateStudents(req, res) {
    try {
        let Students = await UserModel.findOne({ id: req.params.id })
        if (Students) {
            let newStudents = await UserModel.UpdateOne({
                phone: req.body.phone,
                class: req.body.class,
            })
            res.json({ status: 200, data: newStudents })
        } else {
            res.json({ status: 404, message: "Students not found" });
        }
    } catch (e) {
        console.log(e);
    }
}

async function deleteStudents(req, res) {
    try {
        let Students = await UserModel.findOne({ id: req.params.id })
        if (Students) {
            let deleteStudents = await UserModel.deleteOne({ _id: Students._id })
            res.json({ statusbar: 200, message: ' delete successfully' })
        } else {
            res.json({ status: 404, message: "Students not found" })
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = { deleteStudents, updateStudents, viewUpdateStudents, createStudents, viewStudents }