const mongoose = require('mongoose');


// Define the schema for user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    profile_picture: {
        type: String,
    },
    followers: [String],
    following: [String],
    location: {
        type: String,
    },
    title: {
        type: String,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    password: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
