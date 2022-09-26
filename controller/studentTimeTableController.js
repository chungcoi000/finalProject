const router = require('express').Router();
const Student_TimeableModel = require('../model/Student_Timeable.model');
const slug = require('slugify');

async function viewStudentTimeTable(req, res) {
    try {
        let Student_Timeables = await Student_TimeableModel.find()
        res.json({ status: 200, data: Student_Timeables })
    } catch (e) {
        console.log(e);
    }
}

async function createStudentTimeTable(req, res) {
    try {
        let Student_Timeables = await Student_TimeableModel.findOne({ class: req.body.class })
        if (Student_Timeables) {
            res.json({ status: 400, message: 'Student_Timeable da ton tai' })
        } else {
            let Student = await Student_TimeableModel.create({
                class: req.body.class,
                schedular: req.body.schedular,
                slug: slug(req.body.class)
            })
            res.json({ status: 200, message: 'created successfully', data: Student })
        }
    } catch (e) {
        console.log(e);
    }
}

async function viewUpdateStudentTimeTable(req, res) {
    try {
        let Student_Timeables = await Student_TimeableModel.findOne({ id: req.params.id });
        if (Student_Timeables) {
            res.json({ status: 200, data: Student_Timeables })
        } else {
            res.json({ status: 404, message: "Student_Timeable not found" })
        }
    } catch (e) {
        console.log(e);
    }
}

async function updateStudentTimeTable(req, res) {
    try {
        let Student_Timeables = await Student_TimeableModel.findOne({ id: req.params.id })
        if (Student_Timeables) {
            let newStudent_Timeable = await Student_TimeableModel.UpdateOne({
                class: req.body.class,
                schedular: req.body.schedular,
                slug: slug(req.body.class)
            })
            res.json({ status: 200, data: newStudent_Timeable })
        } else {
            res.json({ status: 404, message: "Student_Timeable not found" });
        }
    } catch (e) {
        console.log(e);
    }
}

async function deleteStudentTimeTable(req, res) {
    try {
        let Student_Timeables = await Student_TimeableModel.findOne({ id: req.params.id })
        if (Student_Timeables) {
            let deleteStudent_Timeable = await Student_TimeableModel.deleteOne({ _id: Student_Timeables._id })
            res.json({ statusbar: 200, message: ' delete successfully' })
        } else {
            res.json({ status: 404, message: "Student_Timeable not found" })
        }
    } catch (e) {
        console.log(e);
    }
}