const route = require('express').Router();
const { createPost  ,toggleLike, DeletePost , getALLPosts , getPostById , UpdatePost} = require('../controllers/postcontroller')
const {verifyToken , verifyAdmain , verifyAdmainUser , verifyUser} = require('../middelwares/verifyToken')
route.route("/")
    .post(verifyToken, createPost)
    .get(getALLPosts)
route.route("/:id")
    .delete(verifyToken, DeletePost)
    .get(getPostById)
    .put(verifyToken , UpdatePost)
route.route("/like/:id")
    .put(verifyToken, toggleLike)
module.exports = route