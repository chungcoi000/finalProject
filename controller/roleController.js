const router = require('express').Router();
const RoleModel = require('../model/role.model');
const slug = require('slugify');

async function viewRole(req, res) {
    try {
        let Role = await RoleModel.find()
        res.json({ status: 200, data: Role })
    } catch (e) {
        console.log(e);
    }
}

async function createRole(req, res) {
    try {
        let Role = await RoleModel.findOne({ phone: req.body.phone })
        if (Role) {
            res.json({ status: 400, message: 'Role da ton tai' })
        } else {
            let Student = await RoleModel.create({
                name: req.body.name,
                slug: slug(req.body.name)
            })
            res.json({ status: 200, message: 'created successfully', data: Student })
        }
    } catch (e) {
        console.log(e);
    }
}

async function viewUpdateRole(req, res) {
    try {
        let Role = await RoleModel.findOne({ id: req.params.id });
        if (Role) {
            res.json({ status: 200, data: Role })
        } else {
            res.json({ status: 404, message: "Role not found" })
        }
    } catch (e) {
        console.log(e);
    }
}

async function updateRole(req, res) {
    try {
        let Role = await RoleModel.findOne({ id: req.params.id })
        if (Role) {
            let newRole = await RoleModel.UpdateOne({
                phone: req.body.phone,
                class: req.body.class,
            })
            res.json({ status: 200, data: newRole })
        } else {
            res.json({ status: 404, message: "Role not found" });
        }
    } catch (e) {
        console.log(e);
    }
}

async function deleteRole(req, res) {
    try {
        let Role = await RoleModel.findOne({ id: req.params.id })
        if (Role) {
            let deleteRole = await RoleModel.deleteOne({ _id: Role._id })
            res.json({ statusbar: 200, message: ' delete successfully' })
        } else {
            res.json({ status: 404, message: "Role not found" })
        }
    } catch (e) {
        console.log(e);
    }
}