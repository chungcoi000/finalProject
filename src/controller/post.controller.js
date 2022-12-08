const UserModel = require('../model/user.model')
const PostModel = require('../model/post.model')

const createPost = async (req, res) => {
  try {
    let user = await UserModel.findOne({token: req.cookies.user});
    if (user.role == 'teacher') {
      let post = await PostModel.create({
        title: req.body.title,
        authorID: user._id,
        content: req.body.content,
        classID: req.body.classID
      });
      const newPost = await PostModel.findOne({_id: post._id}).populate("authorID").populate("classID");
      res.json({status: 200, data: newPost, message: "Create Post Successful"})
    } else {
      res.json({
        status: 400, message: "Do not have permissions"
      })
    }
  } catch (e) {
    res.json(e)
  }
}

const getPosts = async (req, res) => {
  try {
    let posts = await PostModel.find({classID: req.query.classID}).populate("authorID").populate("classID");
    if (posts) {
      res.json({status: 200, data: posts});
    } else {
      res.json({status: 400, message: 'No post found'})
    }
  } catch (e) {
    res.json(e)
  }
}

const getPost = async (req, res) => {
  try {
    let post = await PostModel.findOne({_id: req.params.id})
    if (post) {
      res.json({status: 200, data: post})
    } else {
      res.json({status: 400, message: 'No post found'})
    }
  } catch (e) {
    res.json(e)
  }
}

const updatePost = async (req, res) => {
  try {
    let user = await UserModel.findOne({token: req.cookies.user})
    //cos anh
    if (user.role == 'teacher') {
      let post = await PostModel.findOne({_id: req.params.id})
      if (post) {
        let updatePost = await PostModel.findOneAndUpdate({_id: req.params.id}, {
          title: req.body.title,
          content: req.body.content
        }).populate("authorID");
        const newPost = await PostModel.findOne({_id: updatePost._id}).populate("authorID").populate("classID");
        res.json({status: 200, data: newPost, message: 'Update Post Successful'});
      } else {
        res.json({status: 400, message: 'No post found'})
      }
    } else {
      res.json({status: 400, message: 'You do not have permission to update post!'});
    }
  } catch (e) {
    res.json(e)
  }
}

const deletePost = async (req, res) => {
  try {
    let user = await UserModel.findOne({token: req.cookies.user})
    //cos anh
    if (user.role == 'teacher') {
      let post = await PostModel.findOne({_id: req.params.id})
      if (post) {
        let deletePost = await PostModel.findOneAndDelete({_id: req.params.id})
        res.json({status: 200, data: deletePost, message: 'Delete Post Successful'})
      } else {
        res.json({status: 400, message: 'No post found'})
      }
    } else {
      res.json({status: 400, message: 'You do not have permission to delete post!'})
    }
  } catch (e) {
    res.json(e)
  }
}


module.exports = {deletePost, updatePost, getPost, getPosts, createPost}