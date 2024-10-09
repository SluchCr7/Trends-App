const asyncHandler = require("express-async-handler");
const { Post, validatePost, UpdateValidatePost } = require("../modules/Post");


/**
 * @desc    Create Post
 * @route   POST /api/post
 * @access  Public
 * @method  POST
 */

const createPost = asyncHandler(async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.user)
    const post = new Post({
        content: req.body.content,
        user: req.user._id
    });

    const result = await post.save();   

    res.send(result)
})

/**
 * @desc    Delete Post
 * @route   DELETE /api/post/:id
 * @access  Public
 * @method  DELETE
 */

const DeletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }
    await Post.findByIdAndDelete(req.params.id);
    res.send({ message: "Post removed" });
})


/**
 * @desc    Get all posts
 * @route   GET /api/post
 * @access  Public
 * @method  GET
 */

const getALLPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().populate("user").populate("comments")
    res.send(posts);
})

/**
 * @desc    Get post by id
 * @route   GET /api/post/:id
 * @access  Public
 * @method  GET
 */

const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate("user").populate("comments")
    if (!post) {
        res.status(404).json({ message :"Not found Post"})
    }
    res.status(200).send(post)
})

/**
 * @desc    Update Post
 * @route   PUT /api/post/:id
 * @access  Public
 * @method  PUT
 */

const UpdatePost = asyncHandler(async (req, res) => {
    const { error } = UpdateValidatePost(req.body)
    if (error) {
        return res.status(400).json({message:"Not Validate Post"})
    }
    const UpdatePostNew = await Post.findByIdAndUpdate(req.params.id, {
        $set: {
            content : req.body.content
        }
    }, { new: true })
    
    res.status(200).json(UpdatePostNew)
})

/**
 * @desc Like Post
 * @route PUT /api/post/like/:id
 * @access private (only user logged)
 * @method PUT
 */
const toggleLike = asyncHandler(async (req, res) => {
    let post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    const isPostLikedByUser = post.likes.find(
        (user) => user.toString() === req.user._id
    )
    if (isPostLikedByUser) {
        post = await Post.findByIdAndUpdate(req.params.id, {
            $pull: { likes: req.user._id },
        } , {new : true}) 
    }
    else {
        post = await Post.findByIdAndUpdate(req.params.id, {
            $push: { likes: req.user._id },
        }, { new : true })
    }
    res.status(200).json(post)
}) 



module.exports = { createPost , DeletePost  , getALLPosts, getPostById , toggleLike, UpdatePost}