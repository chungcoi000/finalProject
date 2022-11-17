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
    let Role = await RoleModel.findOne({ name: req.body.name });
    if (Role) {
      res.json({ status: 400, message: 'Role is already existed' })
    } else {
      let Student = await RoleModel.create({
        name: req.body.name,
        slug: slug(req.body.name)
      })
      res.json({ status: 200, message: 'Create role successful', data: Student })
    }
  } catch (e) {
    console.log(e);
  }
}

async function viewRoles(req, res) {
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
      let newRole = await RoleModel.updateOne({
        phone: req.body.phone,
        class: req.body.class,
      })
      res.json({ status: 200, message: "Update role successful", data: newRole })
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
      let deleteRole = await RoleModel.findOneAndDelete({ _id: Role._id })
      res.json({ statusbar: 200, message: 'Delete role successful', data: deleteRole });
    } else {
      res.json({ status: 404, message: "Role not found" })
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = { deleteRole, updateRole, viewRoles, createRole, viewRole }