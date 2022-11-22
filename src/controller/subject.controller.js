const SubjectModel = require('../model/subjects.model');
const slug = require('slugify');

async function createSubject(req, res) {
  try {
    let subject = await SubjectModel.findOne({name: req.body.name});
    if (subject) {
      res.json({status: 400, message: 'Subject already exists'});
    } else {
      await SubjectModel.create({name: req.body.name, slug: slug(req.body.name)});
      res.json({status: 200, message: 'Subject created successfully'});
    }
  } catch (e) {
    res.json(e)
    console.log(e);
  }
}

async function viewSubject(req, res) {
  try {
    let subjects = await SubjectModel.find()
    res.json({status: 200, subjects: subjects})
  } catch (e) {
    res.json(e);
    console.log(e);
  }
}

async function updateSubject(req, res) {
  try {
    let subject = await SubjectModel.findOne({slug: req.params.slug});
    if (subject) {
      res.json({status: 200, message: "Update subject successful", subject: subject})
    } else {
      res.json({status: 404, message: 'Not Found'})
    }
  } catch (e) {
    res.json(e);
    console.log(e);
  }
}

async function deleteSubject(req, res) {
  try {
    let subject = await SubjectModel.findOne({slug: req.params.slug})
    if (subject) {
      let subjectDelete = await SubjectModel.deleteOne({slug: subject.slug});
      res.json({status: 200, message: "Delete subject successful", subject: subjectDelete});
    } else {
      res.json({status: 404, status: 'Not Found'});
    }
  } catch (e) {
    res.json(e);
    console.log(e);
  }
}


module.exports = {deleteSubject, updateSubject, viewSubject, createSubject}