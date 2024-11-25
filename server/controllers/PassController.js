const AsyncHandler = require("express-async-handler");
const {User , validateEmail , validateNewPassword} = require("../modules/User");
const bcrypt = require("bcrypt");
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const Verification = require('../modules/verifictionToken')


/**
 * @desc    Send reset password Link
 * @route   POST /api/pass/reset-password-link
 * @access  Public
 * @method  POST
 */

const sendResetPasswordLink = AsyncHandler(async (req, res) => {
    // Validate Email
    const { error } = validateEmail(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send("Invalid email")
    }
    let verificationToken = await Verification.findOne({ userId: user._id })
    if (!verificationToken) {
        verificationToken = new Verification({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        })
        await verificationToken.save()
    }
    const link = `http://localhost:3000/reset/${user._id}/${verificationToken.token}`
    const htmlTemp = `
        <div>
            <p>Click now and Reset your Password</p>
            <a href=${link}>Reset Now</a>
        </div>
    `
    await sendEmail(user.email , "Reset Password" , htmlTemp)
})

const resetPassword = AsyncHandler(async (req, res) => {
    const {error} = validateNewPassword(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(400).send("Invalid User")
    }
    const verificationToken = await Verification.findOne({ userId: user._id })
    if (!verificationToken) {
        return res.status(400).send("Invalid User")
    }
    if (!user.isAccountVerified) {
        user.isAccountVerified = true
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password , salt)
    user.password = hashedPassword
    await Verification.findByIdAndDelete(verificationToken._id)
    await user.save()
    res.status(200).json({message : "Password Reset Successfully"})
})

module.exports = { sendResetPasswordLink , resetPassword }