const router = require('express').Router();
const DateModel = require("../model/date.model");

const getDates = async (req, res) => {
  try {
    let date = await DateModel.find();
    res.json({status: 200, data: date});
  } catch (err) {
    res.json(err)
  }
}

module.exports = {getDates}