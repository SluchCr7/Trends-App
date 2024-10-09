const mongoose = require("mongoose");
const joi = require("joi");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }, 
    profilePhoto:{
        type : Object, 
        default:{
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            publicId : null
        }
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    nameProfile: {
        type: String,
        default: "@nameProfile"
    },
    bio: {
        type: String,
        default: "......."
    },
    savedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Post"
        }
    ]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject : {virtuals: true}
});

// Add virtual property Posts
UserSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "user"
})

UserSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "user"
})
const User = mongoose.model("User", UserSchema);

const validateNewUser = (user) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    return schema.validate(user);
}

const UpdateValidateUser = (user) => {
    const schema = joi.object({
        name: joi.string(),
        // password: joi.string(),
        bio: joi.string(),
        nameProfile: joi.string()
    });
    return schema.validate(user);
}

const validateLogin = (user) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    return schema.validate(user);
}

const validateEmail = (user) => {
    const schema = joi.object({
        email: joi.string().email().required(),
    });
    return schema.validate(user);
}

const validateNewPassword = (user) => {
    const schema = joi.object({
        password: joi.string().required()
    });
    return schema.validate(user);
}

module.exports = { User, validateNewUser, UpdateValidateUser, validateLogin , validateEmail , validateNewPassword}