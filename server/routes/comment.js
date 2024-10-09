const route = require('express').Router();
const { createComment, getAllComment, getcommentbyID, UpdateComment, deleteComment , toggleLike } = require('../controllers/commentController')
const { verifyToken, verifyAdmainUser, verifyUser, verifyAdmain } = require('../middelwares/verifyToken')


route.route("/")
    .post(verifyToken, createComment)
    .get(getAllComment)
route.route("/:id")
    .get(getcommentbyID)
    .put(verifyToken, verifyAdmainUser, UpdateComment)
    .delete(verifyToken, verifyAdmainUser, deleteComment)

route.route("/like/:id")
    .put(verifyToken, toggleLike)
module.exports = route