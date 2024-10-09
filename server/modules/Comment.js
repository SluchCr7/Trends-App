const mongoose = require('mongoose')
const joi = require('joi')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Post',
        required: true
    }, 
    username : {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ]
}, { timestamps: true })

const Comment = mongoose.model('Comment', CommentSchema)

const validateComment = (comment) => {
    const schema = joi.object({
        content: joi.string().required(),
        postId: joi.string().required(),
    })
    return schema.validate(comment)
}   

const updateComment = (comment) => {
    const schema = joi.object({
        content: joi.string(),
    })
    return schema.validate(comment)
}

module.exports = { Comment, validateComment, updateComment }