const router = require('express').Router();
const ClassModel = require('../model/user.model');
const slug = require('slugify');

async function viewclass(req, res) {
    try {
        let classs = await ClassModel.find()
        res.json({ status: 200, data: classs })
    } catch (e) {
        console.log(e);
    }
}

async function createclass(req, res) {
    try {
        let classs = await ClassModel.findOne({ phone: req.body.phone })
        if (classs) {
            res.json({ status: 400, message: 'class da ton tai' })
        } else {
            let Student = await ClassModel.create({
                name: req.body.name,
                unit: req.body.unit,
                fromTeacher: req.body.fromTeacher,
                slug: slug(req.body.name)
            })
            res.json({ status: 200, message: 'created successfully', data: Student })
        }
    } catch (e) {
        console.log(e);
    }
}

async function viewUpdateclass(req, res) {
    try {
        let classs = await ClassModel.findOne({ id: req.params.id });
        if (classs) {
            res.json({ status: 200, data: classs })
        } else {
            res.json({ status: 404, message: "class not found" })
        }
    } catch (e) {
        console.log(e);
    }
}

async function updateclass(req, res) {
    try {
        let classs = await ClassModel.findOne({ id: req.params.id })
        if (classs) {
            let newclass = await ClassModel.UpdateOne({
                unit: req.body.unit,
                fromTeacher: req.body.fromTeacher,
            })
            res.json({ status: 200, data: newclass })
        } else {
            res.json({ status: 404, message: "class not found" });
        }
    } catch (e) {
        console.log(e);
    }
}

async function deleteclass(req, res) {
    try {
        let classs = await ClassModel.findOne({ id: req.params.id })
        if (classs) {
            let deleteclass = await ClassModel.deleteOne({ _id: classs._id })
            res.json({ statusbar: 200, message: ' delete successfully' })
        } else {
            res.json({ status: 404, message: "class not found" })
        }
    } catch (e) {
        console.log(e);
    }
}