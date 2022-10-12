const UnitModel = require('../model/unit.model');
const slug = require('slugify');

async function viewUnits(req, res) {
  try {
    let Unit = await UnitModel.find()
    res.json({status: 200, data: Unit})
  } catch (e) {
    console.log(e);
  }
}

async function createUnit(req, res) {
  try {
    let Unit = await UnitModel.findOne({phone: req.body.phone})
    if (Unit) {
      res.json({status: 400, message: 'Unit is existed'});
    } else {
      let unit = await UnitModel.create({
        name: req.body.name,
        slug: slug(req.body.name)
      })
      res.json({status: 200, message: 'Create unit successful', data: unit});
    }
  } catch (e) {
    console.log(e);
  }
}

async function viewUnit(req, res) {
  try {
    let unit = await UnitModel.findOne({id: req.params.id});
    if (unit) {
      res.json({status: 200, data: unit})
    } else {
      res.json({status: 404, message: "Unit not found"})
    }
  } catch (e) {
    console.log(e);
  }
}

async function updateUnit(req, res) {
  try {
    let unit = await UnitModel.findOne({id: req.params.id});
    if (unit) {
      let newUnit = await UnitModel.updateOne({
        name: req.body.name,
        slug: slug(req.body.name)
      })
      res.json({status: 200, data: newUnit})
    } else {
      res.json({status: 404, message: "Unit not found"});
    }
  } catch (e) {
    console.log(e);
  }
}

async function deleteUnit(req, res) {
  try {
    let unit = await UnitModel.findOne({id: req.params.id})
    if (unit) {
      let deleteUnit = await UnitModel.deleteOne({_id: unit._id})
      res.json({statusbar: 200, message: ' Delete unit successful'})
    } else {
      res.json({status: 404, message: "Unit not found"});
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {viewUnit, createUnit, viewUnits, updateUnit, deleteUnit}