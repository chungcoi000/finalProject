const router = require('express').Router();
const UserModel = require('../model/user.model');



async function viewTeachers(req, res) {
    try {
        let teacher = await UserModel.find()
        res.json({ status: 200, data: teacher })
    } catch (e) {
        console.log(e);
    }
}

async function createTeacher(req, res) {
    try {
        let teacher = await UserModel.findOne({ phone: req.body.phone })
        if (teacher) {
            res.json({ status: 400, message: 'Teacher da ton tai' })
        } else {
            let teacer = await UserModel.create({
                name: req.body.name,
                dob: req.body.dob,
                role: req.body.role,
                class: req.body.class,
                phone: req.body.phone,
                subject: req.body.subject,
                gender: req.body.gender,
            })
            res.json({ status: 200, message: 'created successfully' })
        }
    } catch (e) {
        console.log(e);
    }
}

async function viewUpdateTeacher(req, res) {
    try {
        let teacher = await UserModel.findOne({ id: req.params.id });
        if (teacher) {
            res.json({ status: 200, data: teacher })
        } else {
            res.json({ status: 404, message: "Teacher not found" })
        }
    } catch (e) {
        console.log(e);
    }
}

async function updateTeacher(req, res) {
    try {
        let teacher = await UserModel.findOne({ id: req.params.id })
        if (teacher) {
            let newTeacher = await UserModel.UpdateOne({
                phone: req.body.phone,
                class: req.body.class,
            })
            res.json({ status: 200, data: newTeacher })
        } else {
            res.json({ status: 404, message: "Teacher not found" });
        }
    } catch (e) {
        console.log(e);
    }
}

async function deleteTeacher(req, res) {
    try {
        let teacher = await UserModel.findOne({ id: req.params.id })
        if (teacher) {
            let deleteTeacher = await UserModel.deleteOne({ _id: teacher._id })
            res.json({ statusbar: 200, message: ' delete successfully' })
        } else {
            res.json({ status: 404, message: "Teacher not found" })
        }
    } catch (e) {
        console.log(e);
    }
}