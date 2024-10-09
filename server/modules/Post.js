const mongoose = require('mongoose')
const joi = require('joi')


const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
 })

PostSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'postId',

})


const Post = mongoose.model('Post', PostSchema)

const validatePost = (post) => {
    const schema = joi.object({
        content: joi.string().required()
    })
    return schema.validate(post)
}
const UpdateValidatePost = (post) => {
    const schema = joi.object({
        content: joi.string()
    })
    return schema.validate(post)
}

module.exports = {
    Post, validatePost , UpdateValidatePost
}