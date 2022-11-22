const UserModel = require('../model/user.model')
const PostModel = require('../model/post.model')
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
                let post = await PostModel.create({
                    title: req.body.title,
                    file: file,
                    authorID: user.id,
                    content: req.body.content
                })

                res.json({ status: 200, data: post })
            } else {
                // khong co anh
                let post = await PostModel.create({
                    title: req.body.title,
                    authorID: user.id,
                    content: req.body.content
                })
                res.json({ status: 200, data: post })
            }
        } else {
            res.json({
                status: 200, message: 'role khong hop le'
            })
        }
    } catch (e) {
        res.json(e)
    }
}

const getPosts = async (req, res) => {
    try {
        let posts = await PostModel.find({id: req.params.id});
        if (posts) {
            res.json({ status: 200, data: posts })
        } else {
            res.json({ status: 200, message: 'ko co post nao' })
        }
    } catch (e) {
        res.json(e)
    }
}

const getPost = async (req, res) => {
    try {
        let post = await PostModel.findOne({ id: req.params.id })
        if (post) {
            res.json({ status: 200, data: post })
        } else {
            res.json({ status: 200, message: 'ko co post nao' })
        }
    } catch (e) {
        res.json(e)
    }
}

const updatePost = async (req, res) => {
    try {
        let user = await UserModel.findOne({ token: req.cookies.user }).populate('role')
        //cos anh
        if (user.role.name == 'teacher') {
            let post = await PostModel.findOne({ id: req.params.id })
            if (post) {
                let updatePost = await PostModel.findOneAndUpdate({ id: req.params.id }, {
                    title: req.body.title,
                    content: req.body.content
                })
                res.json({ status: 200, data: updatePost })
            } else {
                res.json({ status: 200, message: 'ko co post nao' })
            }
        }
    } catch (e) {
        res.json(e)
    }
}

const deletePost = async (req, res) => {
    try {
        let user = await UserModel.findOne({ token: req.cookies.user }).populate('role')
        //cos anh
        if (user.role.name == 'teacher') {
            let post = await PostModel.findOne({ id: req.params.id })
            if (post) {
                let deletePost = await PostModel.findOneAndDelete({ id: req.params.id })
                res.json({ status: 200, data: deletePost })
            } else {
                res.json({ status: 200, message: 'ko co post nao' })
            }
        }
    } catch (e) {
        res.json(e)
    }
}


module.exports = { deletePost, updatePost, getPost, getPosts, createPost }