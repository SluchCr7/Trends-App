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
