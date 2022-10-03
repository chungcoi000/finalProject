const UserModel = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



// login
async function login(req, res) {
    try {
        // console.log(req.body.href);
        const data = await UserModel.findOne({
            email: req.body.email,
        });

        if (data) {
            const checkPassword = await bcrypt.compare(
                req.body.password,
                data.password
            );
            if (checkPassword) {
                const UserID = data._id;
                const token = jwt.sign(`${UserID}`, "chung");
                await UserModel.updateOne(
                    { _id: data._id },
                    { token: token }
                );
                res.cookie("user", token, {
                    expires: new Date(Date.now() + 9000000),
                });
                let user = await UserModel.findOne({ email: req.body.email })
                res.json({ role: user.role })
            } else {
                res.json({ message: " incorrect password" });
            }
        } else {
            res.json({ message: "login failed", status: 400, err: false });
        }
    } catch (err) {
        res.json(76, err);
    }
}



// register 
async function register(req, res) {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        // console.log(user);
        if (user) {
            res.json({
                status: 400,
                message: 'email da ton tai',
            })
        } else {
            if (req.body.role === 'student') {
                const password = await bcrypt.hash(req.body.password, 20);
                let newUser = await UserModel.create({
                    email: req.body.email,
                    password: password,
                    name: req.body.name,
                    dob: req.body.dateOfBirth,
                    role: req.body.role,
                    class: req.body.class,
                    phone: req.body.phone,
                    gender: req.body.gender,
                    role: "user",
                });
            } else if (req.body.role === 'teacher') {
                const password = await bcrypt.hash(req.body.password, 20);
                let newUser = await UserModel.create({
                    email: req.body.email,
                    password: password,
                    name: req.body.name,
                    dob: req.body.dateOfBirth,
                    role: req.body.role,
                    class: req.body.class,
                    subject: req.body.subject,
                    phone: req.body.phone,
                    gender: req.body.gender,
                    role: "user",
                });
            } else {
                const password = await bcrypt.hash(req.body.password, 10);
                let newUser = await UserModel.create({
                    email: req.body.email,
                    password: password,
                    name: req.body.name,
                    dob: req.body.dateOfBirth,
                    role: req.body.role,
                    child: req.body.child,
                    phone: req.body.phone,
                    gender: req.body.gender,
                    role: "user",
                });
            }

            res.json({
                message: "login success",
                status: 200,
            });
        }

    } catch (err) {
        res.json(err);
    }
}

module.exports = { login, register }