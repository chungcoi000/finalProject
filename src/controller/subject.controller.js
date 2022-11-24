const SubjectModel = require('../model/subjects.model');
const slug = require('slugify');
const UserModel = require("../model/user.model");

async function createSubject(req, res) {
  try {
    let subject = await SubjectModel.findOne({name: req.body.name});
    if (subject) {
      res.json({status: 400, message: 'Subject already exists'});
    } else {
      const newSubject = await SubjectModel.create({name: req.body.name, slug: slug(req.body.name)});
      res.json({status: 200, data: newSubject, message: 'Subject created successfully'});
    }
  } catch (e) {
    res.json(e)
    console.log(e);
  }
}

async function viewSubjects(req, res) {
  try {
    let subject = await SubjectModel.find().skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    let subjects = await SubjectModel.find();
    let totalPage = 0;
    if (Math.ceil(subjects.length / 10) > 0) {
      totalPage = Math.ceil(subjects.length / 10);
    }
    let nextPage, prePage;
    let page = req.query.page;
    if (req.query.page === totalPage && req.query.page === 1) {
      nextPage = false
      prePage = false
    } else if (req.query.page >= totalPage) {
      nextPage = false
      prePage = true
    } else if (req.query.page <= totalPage) {
      nextPage = true
      prePage = false
    } else {
      nextPage = true
      prePage = true
    }
    let data = {nextPage: nextPage, prePage: prePage, total: subjects.length, page: page}
    res.json({status: 200, data: subject, pagination: data})
  } catch (e) {
    res.json({
      data: e, message: "Something is error!"
    });
    console.log(e);
  }
}

async function getAllSubjects(req, res) {
  try {
    let subjects = await SubjectModel.find();
    res.json({status: 200, data: subjects});
  } catch (e) {
    res.json({
      data: e, message: "Something is error!"
    });
    console.log(e);
  }
}


async function deleteSubject(req, res) {
  try {
    let subject = await SubjectModel.findOne({_id: req.params.id})
    if (subject) {
      let subjectDelete = await SubjectModel.findOneAndDelete({_id: subject._id});
      res.json({status: 200, message: "Delete subject successful", data: subjectDelete});
    } else {
      res.json({status: 404, message: 'Subject Not Found'});
    }
  } catch (e) {
    res.json(e);
    res.json({status: 404, message: "Something error"});
  }
}


module.exports = {deleteSubject, viewSubjects, createSubject, getAllSubjects}