const mongoose = require('mongoose');

// Define the schema for a single comment
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comment: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

// Define the schema for the post that includes an array of comments
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image_url: {
        type: String,
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    status: {
        type: String,
    },

    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    comments: [commentSchema],  // Array of comments based on the commentSchema
});

// Create the model from the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
