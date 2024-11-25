const route = require('express').Router();
const bcrypt = require("bcrypt");
const {sendResetPasswordLink , resetPassword} = require("../controllers/PassController")

route.route("/reset")
    .post(sendResetPasswordLink)
route.route("/reset-password/:id/:token")
    .get(resetPassword)
module.exports = route