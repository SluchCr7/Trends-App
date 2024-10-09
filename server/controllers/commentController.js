const asyncHandler = require("express-async-handler");
const { Comment, validateComment, updateComment } = require("../modules/Comment");
const {User} = require("../modules/User");

/**
 * @desc    Create Comment
 * @route   POST /api/comment   
 * @access  Public
 * @method  POST
 * */

const createComment = asyncHandler(async(req, res) => {
    const {error} = validateComment(req.body)
    if (error) {
        res.status(400).json({"message": "Error"})
    }
    const profile = await User.findById(req.user._id)
    console.log(req.user)
    // console.log(req.body)
    // console.log(profile)
    const comment = await Comment.create({
        postId: req.body.postId,
        user: req.user._id,
        content: req.body.content,
        username: profile.name,
    })
    res.status(201).json(comment)
})

/**
 * @desc    Update Comment
 * @route   PUT /api/comment/:id
 * @access  Public
 * @method  PUT
 */

const UpdateComment = asyncHandler(async(req, res) => {
    const { error } = updateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
        res.status(404).json({ message :"Not found Comment"});
    }
    else {
        if (req.user._id === comment.user.toString()) {
            const commentUpdate = await Comment.findByIdAndUpdate(req.params.id, {
                $set: {
                    content: req.body.text
                }
            }, { new: true })
            res.status(200).json(commentUpdate)
        }
        else {
            res.status(400).json({ message: "You are not authorized" })
        }
    }
})

/**
 * @desc    Delete Comment
 * @route   DELETE /api/comment/:id
 * @access  Public
 * @method  DELETE
 */

const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    if (!comment) {
        res.status(404).json({ message: "You are not authorized" })
    }
    else {
        if (req.user.isAdmin||req.user._id === comment.user.toString()) {
            const commentDelete = await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json(commentDelete)
        }
        else {
            res.status(400).json({ message: "You are not authorized" })
        }
    }
})

const getAllComment = asyncHandler(async (req, res) => {
    const comments = await Comment.find().populate("user");
    res.send(comments)
})

const getcommentbyID = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id).populate("user");
    if (!comment) {
        res.status(404).json({message : "Not found comment"})
    }
    res.status(200).send(comment)
})



/**
 * @desc    Toggle Like
 * @route   DELETE /api/comment/like/:id
 * @access  private (only user logged)
 * @method  PUT
 */

const toggleLike = asyncHandler(async (req, res) => {
    let comment = await Comment.findById(req.params.id);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }
    const isCommentLikedByUser = comment.likes.find(
        (user) => user.toString() === req.user._id
    )
    if (isCommentLikedByUser) {
        comment = await Comment.findByIdAndUpdate(req.params.id, {
            $pull: { likes: req.user._id },
        } , {new : true}) 
    }
    else {
        comment = await Comment.findByIdAndUpdate(req.params.id, {
            $push: { likes: req.user._id },
        }, { new : true }) 
    }
    res.status(200).send(comment)
})
module.exports = { createComment ,toggleLike, UpdateComment , deleteComment , getAllComment , getcommentbyID}