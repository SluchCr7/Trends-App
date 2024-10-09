const route = require('express').Router();
const {registerUser , toggleFollow,LoginUser ,UpdateProfile, getUsers ,getAllUsersByName, getUserbyId ,SavedPosts, DeleteUser , uploadPhoto, verifyAccount} = require('../controllers/authController')
const photoUpload = require("../middelwares/photouploader") 
const {verifyToken , verifyAdmain , verifyAdmainUser , verifyUser} = require('../middelwares/verifyToken')
route.route("/register")
    .post(registerUser)
route.route("/login")
    .post(LoginUser)
route.route("/:id")
    .delete(DeleteUser)
    .get(getUserbyId)
route.route("/profile/:id")
    .put(verifyToken,UpdateProfile)
route.route("/")
    .get(getUsers)
route.route("/follow/:id")
    .put(verifyToken,toggleFollow)
route.route("/photo")
    .post(verifyToken, photoUpload.single("image"), uploadPhoto)
    
route.route("/:userId/verify/:token")
    .get(verifyAccount)

route.route("/Users/search")
    .get(getAllUsersByName)

route.route("/Save/:id")
    .put(verifyToken , SavedPosts)
module.exports = route