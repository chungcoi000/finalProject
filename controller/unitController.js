const router = require('express').Router();
const UnitModel = require('../model/unit.model');
const slug = require('slugify');

async function viewUnit(req, res) {
    try {
        let Unit = await UnitModel.find()
        res.json({ status: 200, data: Unit })
    } catch (e) {
        console.log(e);
    }
}

async function createUnit(req, res) {
    try {
        let Unit = await UnitModel.findOne({ phone: req.body.phone })
        if (Unit) {
            res.json({ status: 400, message: 'Unit da ton tai' })
        } else {
            let Student = await UnitModel.create({
                name: req.body.name,
                slug: slug(req.body.name)
            })
            res.json({ status: 200, message: 'created successfully', data: Student })
        }
    } catch (e) {
        console.log(e);
    }
}

async function viewUpdateUnit(req, res) {
    try {
        let Unit = await UnitModel.findOne({ id: req.params.id });
        if (Unit) {
            res.json({ status: 200, data: Unit })
        } else {
            res.json({ status: 404, message: "Unit not found" })
        }
    } catch (e) {
        console.log(e);
    }
}

async function updateUnit(req, res) {
    try {
        let Unit = await UnitModel.findOne({ id: req.params.id })
        if (Unit) {
            let newUnit = await UnitModel.UpdateOne({
                name: req.body.name,
                slug: slug(req.body.name)
            })
            res.json({ status: 200, data: newUnit })
        } else {
            res.json({ status: 404, message: "Unit not found" });
        }
    } catch (e) {
        console.log(e);
    }
}

async function deleteUnit(req, res) {
    try {
        let Unit = await UnitModel.findOne({ id: req.params.id })
        if (Unit) {
            let deleteUnit = await UnitModel.deleteOne({ _id: Unit._id })
            res.json({ statusbar: 200, message: ' delete successfully' })
        } else {
            res.json({ status: 404, message: "Unit not found" })
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = { viewUnit, createUnit, viewUpdateUnit, updateUnit, deleteUnit }