const AsyncHandler = require("express-async-handler");
const {User , validateNewUser , validateLogin , UpdateValidateUser} = require("../modules/User");
const bcrypt = require("bcrypt");
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const jwt = require("jsonwebtoken");
const path = require('path')
const {cloudRemove , cloudUpload} = require("../utils/cloudinary")
const fs = require('fs')
const { Comment } = require("../modules/Comment")
const {Post} = require("../modules/Post");
const { use } = require("../routes/post");
const Verification = require('../modules/verifictionToken')
/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 * @method  POST
 */

const registerUser = AsyncHandler(async (req, res) => {
    const { error } = validateNewUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).send("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })

    await user.save();
    const newVerificationToken = new Verification({
        userId: user._id,
        tokenVer : crypto.randomBytes(32).toString("hex")
    })
    await newVerificationToken.save()
    // Generate Link
    const link = `http://localhost:3000/pages/users/${user._id}/verify/${newVerificationToken.tokenVer}`
    const htmlTemp = `
        Verify your email by:
        click in this link <a href=${link}>Verify</a> to verify your email
        and go to the login page and start Shopping and enjoy
    `
    await sendEmail(user.email , "Verify your Email" , htmlTemp)

    res.status(201).json({ message: "we sent an email now , go to verify your email" });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 * @method  POST
 */

const LoginUser = AsyncHandler(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        
        return res.status(400).send("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send("Invalid email or password");
    }

    // check if user is verified
    if (!user.isAccountVerified) {
        let verificationToken = await Verification.findOne({
            userId: user._id,
        })
        if (!verificationToken) {
            verificationToken = new Verification({
                userId: user._id,
                tokenVer: crypto.randomBytes(32).toString('hex'),
            })
            await verificationToken.save()
        }
        const link = `${process.env.DOMAIN_NAME}/pages/users/${user._id}/verify/${verificationToken.tokenVer}`
        const htmlTemp = `
            Verify your email by:   
            click in this link <a href=${link}>Verify</a> to verify your email
            and go to the login page and start your journey with us
        `
        sendEmail(user.email, 'Verify Email', htmlTemp)
        return res.status(400).send('Please verify your email')
    }

    const token = jwt.sign({ _id: user._id , isAdmin: user.isAdmin }, process.env.TOKEN_SECRET);
    const { Password, ...others } = user._doc
    res.send({ ...others, token });
})

/**
 * @desc    Get all usrs
 * @route   GET /api/auth
 * @access  Public
 * @method  GET
 */


const getUsers = AsyncHandler(async (req, res) => {
    const users = await User.find()
        .populate("comments")
        .populate("posts")
        .populate("savedPosts");
    res.send(users);
})

/**
 * @desc    Get User by id
 * @route   GET /api/auth/:id
 * @access  Public
 * @method  GET
 */

const getUserbyId = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).populate("comments").populate("posts").populate("savedPosts");
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.send(user)
})

/**
 * @desc    Delete User
 * @route   DELETE /api/auth/:id
 * @access  private (only user logged or admin)
 * @method  DELETE
 */

const DeleteUser = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    await User.findByIdAndDelete(req.params.id);
    // Remove all posts belong to user
    await Post.deleteMany({ user: user._id })
    await Comment.deleteMany({user : user._id})
    res.send({ message: "User removed" });
})



/**
 * @desc    Update User
 * @route   PUT /api/auth/:id
 * @access  private (only user logged)
 * @method  PUT
 */

const UpdateProfile = AsyncHandler(async (req, res) => {
    const { error } = UpdateValidateUser(req.body)
    if (error) {
        return res.status(400).json({ message: "not Validate Data" })
    }
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password , salt) 
    }
    const Updateuser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            // password: req.body.password,
            bio: req.body.bio,
            nameProfile : req.body.nameProfile
        }
    }, { new: true })
    res.status(200).json(Updateuser)
})

/**
 * @desc    Upload Profile Photo
 * @route   POST /api/auth/photo
 * @access  private (only user logged)
 * @method  POST
 */


const uploadPhoto = AsyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({message : "No file uploaded"})
    }
    // Get image 
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
    // Upload Image
    const result = await cloudUpload(imagePath)
    // console.log(req.user)
    const user = await User.findById(req.user._id)
    if(user.profilePhoto.publicId !== null){
        await cloudRemove(user.profilePhoto.publicId)
    }
    user.profilePhoto = {
        url: result.secure_url,
        publicId: result.public_id
    }
    await user.save()
    // console.log(result)
    res.status(200).json({
            url: result.secure_url
            , publicId: result.public_id
    })
    fs.unlinkSync(imagePath)
})

/**
 * @desc    toggle Follow
 * @route   PUT /api/auth/follow/:id
 * @access  private (only user logged)
 * @method  PUT
 */

const toggleFollow = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    if (user.followers.includes(req.user._id)) {
        await User.findByIdAndUpdate(req.params.id, {
            $pull: { followers: req.user._id },
        });
    } else {
        await User.findByIdAndUpdate(req.params.id, {
            $push: { followers: req.user._id },
        });
    }
    res.status(200).json(user);
})

/**
 * @desc    toggle Save
 * @route   PUT /api/auth/Save/:id
 * @access  private (only user logged)
 * @method  PUT
 */

const SavedPosts = AsyncHandler(async (req, res) => {
    let user = await User.findById(req.user._id)
    if (user.savedPosts.includes(req.params.id)) {
        await User.findByIdAndUpdate(req.user._id, {
            $pull :{ savedPosts : req.params.id}
        })
    }
    else {
        await User.findByIdAndUpdate(req.user._id, {
            $push :{savedPosts : req.params.id}
        })
    }
    user = await User.findById(req.user._id)
        .populate("savedPosts")    
    res.status(200).json(user)
})



/**
 * @desc    Verify Account
 * @route   /api/auth/:userId/verify/:tokenver
 * @access  Public
 * @method  GET
 */

const verifyAccount = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    const verificationToken = await Verification.findOne({ userId: user._id , tokenVer: req.params.token })
    if (!verificationToken) {
        res.status(404)
        throw new Error('Verification token not found')
    }
    user.isAccountVerified = true
    await user.save()
    await Verification.findByIdAndDelete(verificationToken._id)
    res.status(200).json({ message: 'Email verified' })
})


/**
 * @desc    get User By Name
 * @route   GET /api/auth/Users/search
 * @access  public
 * @method  GET
 */
const getAllUsersByName = (async (req, res) => {
    const name = req.query.name
    const users = await User.find({ name: { $regex: name} })
    res.send(users)
});

module.exports = { registerUser, toggleFollow,LoginUser,getUsers, getUserbyId,verifyAccount, DeleteUser , uploadPhoto , UpdateProfile , getAllUsersByName , SavedPosts}