// const router = require('express').Router();
const ClassModel = require('../model/class.model');
const slug = require('slugify');
const UserModel = require('../model/user.model');
const PostModel = require('../model/post.model');
const getClasses = async (req, res) => {
    try {
        let classes = await ClassModel.find()
        res.json({ status: 200, data: classes })
    } catch (e) {
        console.log(e);
    }
}

const addClass = async (req, res) => {
    try {
        let classs = await ClassModel.findOne({ name: req.body.name })
        if (classs) {
            res.json({ status: 400, message: 'Class is already existed' })
        } else {
            let Class = await ClassModel.create({
                name: req.body.name,
                unit: req.body.unit,
                student: req.body.student,
                fromTeacher: req.body.fromTeacher,
                slug: slug(req.body.name)
            })
            res.json({ status: 200, message: 'Created class successful', data: Class })
        }
    } catch (e) {
        console.log(e);
    }
}

const getClass = async (req, res) => {
    try {
        let class1 = await ClassModel.findOne({ id: req.params.id });
        if (class1) {
            res.json({ status: 200, data: class1 })
        } else {
            res.json({ status: 404, message: "Class not found" })
        }
    } catch (e) {
        console.log(e);
    }
}

const updateClass = async (req, res) => {
    try {
        let class1 = await ClassModel.findOne({ id: req.params.id })
        if (class1) {
            let updateClass = await ClassModel.updateOne({
                unit: req.body.unit,
                fromTeacher: req.body.fromTeacher,
            });
            res.json({ status: 200, message: "Update class successful", data: updateClass });
        } else {
            res.json({ status: 404, message: "Class not found" });
        }
    } catch (e) {
        console.log(e);
    }
}

const deleteClass = async (req, res) => {
    try {
        let class1 = await ClassModel.findOne({ id: req.params.id })
        if (class1) {
            let deleteClass = await ClassModel.findOneAndDelete({ _id: class1._id })
            res.json({ statusbar: 200, message: 'Delete class successful', data: deleteClass })
        } else {
            res.json({ status: 404, message: "Class not found" })
        }
    } catch (e) {
        console.log(e);
    }
}


const upClass = async (req, res) => {
    try {
        let class1 = await ClassModel.find()
        let class12 = []
        for (let i = 0; i < class1.length; i++) {
            if (class1[i].includes('12')) {
                class12 = class12.push(class1[i])
            }
        }
        for (let i = 0; i < class12.length; i++) {
            for (let j = 0; j < class12[i].student.length; j++) {
                await UserModel.deleteOne({ child: class12[i].student[j] })
                await UserModel.deleteOne({ _id: class12[i].student[j] });
            }
        }
        let classUp = await ClassModel.find()
        for (let i = 0; i < classUp.length; i++) {
            let up = classUp[i].name.split('')
            let a = Number(up[1]) + 1
            up = up.splice(1, 1, a)
            classUp[i].name = up.join()
        }
    } catch (e) {
        console.log(e);
    }
}

//create posst
const createPost = async (req, res) => {
    try {
        let file = []
        let user = await UserModel.findOne({ token: req.cookies.user }).populate('role')
        //cos anh
        if (user.role.name == 'teacher') {
            if (req.file.length > 0) {
                for (let i = o; i < req.files.length; i++) {
                    file.push(req.files[i].path)
                }
            }
            let post = await PostModel.create({
                name: req.body.name,
                file: file
            })
            res.json({ status: 200, data: post })
        } else {
            // khong co anh
            let post = await PostModel.create({
                name: req.body.name,
            })
            res.json({ status: 200, data: post })
        }
    } catch (e) {
        res.json(e)
    }
}
module.exports = { createPost, deleteClass, updateClass, getClass, addClass, getClasses, upClass }