const router = require('express').Router();
const ClassModel = require('../model/user.model');
const slug = require('slugify');

const getClasses = async (req, res) => {
    try {
        let classes = await ClassModel.find()
        res.json({status: 200, data: classes})
    } catch (e) {
        console.log(e);
    }
}

const addClass = async (req, res) => {
    try {
        let classs = await ClassModel.findOne({phone: req.body.phone})
        if (classs) {
            res.json({status: 400, message: 'Class is already existed'})
        } else {
            let Class = await ClassModel.create({
                name: req.body.name,
                unit: req.body.unit,
                fromTeacher: req.body.fromTeacher,
                slug: slug(req.body.name)
            })
            res.json({status: 200, message: 'Created class successful', data: Class})
        }
    } catch (e) {
        console.log(e);
    }
}

const getClass = async (req, res) => {
    try {
        let class1 = await ClassModel.findOne({id: req.params.id});
        if (class1) {
            res.json({status: 200, data: class1})
        } else {
            res.json({status: 404, message: "Class not found"})
        }
    } catch (e) {
        console.log(e);
    }
}

const updateClass = async (req, res) => {
    try {
        let class1 = await ClassModel.findOne({id: req.params.id})
        if (class1) {
            let updateClass = await ClassModel.updateOne({
                unit: req.body.unit,
                fromTeacher: req.body.fromTeacher,
            });
            res.json({status: 200, message: "Update class successful", data: updateClass});
        } else {
            res.json({status: 404, message: "Class not found"});
        }
    } catch (e) {
        console.log(e);
    }
}

const deleteClass = async (req, res) => {
    try {
        let class1 = await ClassModel.findOne({id: req.params.id})
        if (class1) {
            let deleteClass = await ClassModel.deleteOne({_id: class1._id})
            res.json({statusbar: 200, message: 'Delete class successful', data: deleteClass})
        } else {
            res.json({status: 404, message: "Class not found"})
        }
    } catch (e) {
        console.log(e);
    }
}


module.exports = {deleteClass, updateClass, getClass, addClass, getClasses}