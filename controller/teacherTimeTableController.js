const router = require('express').Router();
const Teacher_TimeableModel = require('../model/Teacher_Timeable.model');
const slug = require('slugify');

async function viewteacherTimeTable(req, res) {
    try {
        let Teacher_Timeables = await Teacher_TimeableModel.find()
        res.json({ status: 200, data: Teacher_Timeables })
    } catch (e) {
        console.log(e);
    }
}

async function createteacherTimeTable(req, res) {
    try {
        let Teacher_Timeables = await Teacher_TimeableModel.findOne({ class: req.body.class })
        if (Teacher_Timeables) {
            res.json({ status: 400, message: 'Teacher_Timeable da ton tai' })
        } else {
            let Teacher = await Teacher_TimeableModel.create({
                class: req.body.class,
                schedular: req.body.schedular,
                slug: slug(req.body.class)
            })
            res.json({ status: 200, message: 'created successfully', data: Teacher })
        }
    } catch (e) {
        console.log(e);
    }
}

async function viewUpdateteacherTimeTable(req, res) {
    try {
        let Teacher_Timeables = await Teacher_TimeableModel.findOne({ id: req.params.id });
        if (Teacher_Timeables) {
            res.json({ status: 200, data: Teacher_Timeables })
        } else {
            res.json({ status: 404, message: "Teacher_Timeable not found" })
        }
    } catch (e) {
        console.log(e);
    }
}

async function updateteacherTimeTable(req, res) {
    try {
        let Teacher_Timeables = await Teacher_TimeableModel.findOne({ id: req.params.id })
        if (Teacher_Timeables) {
            let newTeacher_Timeable = await Teacher_TimeableModel.UpdateOne({
                class: req.body.class,
                schedular: req.body.schedular,
                slug: slug(req.body.class)
            })
            res.json({ status: 200, data: newTeacher_Timeable })
        } else {
            res.json({ status: 404, message: "Teacher_Timeable not found" });
        }
    } catch (e) {
        console.log(e);
    }
}

async function deleteteacherTimeTable(req, res) {
    try {
        let Teacher_Timeables = await Teacher_TimeableModel.findOne({ id: req.params.id })
        if (Teacher_Timeables) {
            let deleteTeacher_Timeable = await Teacher_TimeableModel.deleteOne({ _id: Teacher_Timeables._id })
            res.json({ statusbar: 200, message: ' delete successfully' })
        } else {
            res.json({ status: 404, message: "Teacher_Timeable not found" })
        }
    } catch (e) {
        console.log(e);
    }
}