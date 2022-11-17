const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

module.exports.checkRoleAdmin = async (req, res, next) => {
    try {
        if (req.user.role.name === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'role is not allowed' })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.checkRoleTeacher = async (req, res, next) => {
    try {
        if (req.user.role.name === 'teacher') {
            next();
        } else {
            res.status(403).json({ message: 'role is not allowed' })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.checkRoleStudent = async (req, res, next) => {
    try {
        if (req.user.role.name == 'student') {
            next();
        } else {
            res.status(403).json({ message: 'role is not allowed' })
        }
    } catch (err) {
        console.log(err);
    }
}


module.exports.checkRoleParent = async (req, res, next) => {
    try {
        if (req.user.role.name == 'parent') {
            next();
        } else {
            res.status(403).json({ message: 'role is not allowed' })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.checkToken = async (req, res, next) => {
    let searchTokenUser
    try {
        let token = req.cookies.user
        searchTokenUser = await UserModel.findOne(
            { token: token }
        ).populate('role')
        if (searchTokenUser) {
            let id = jwt.verify(token, 'token')
            if (id) {
                delete searchTokenUser._doc.token
                delete searchTokenUser._doc.password
                req.user = searchTokenUser
                next()
            }
        } else {
            res.render('components/error')
        }
    } catch (error) {
        if (error.message == 'jwt expired') {
            res.json({ message: 'jwt expired' })
        } else {
            res.json(error)
        }
    }
}
