const Post = require('../../models/postModel');
const User = require('../../models/userModel');

/**
 * 
 * This handles Updating the user profile;
 */
const createPostService = async ({ props }) => {
    try {
        const { title, description, image_url, user_id } = props;

        if (!user_id) {
            return { code: 'aE400', message: 'Please provide a user id' }
        }
        const user = await User.findById(user_id);
        if (!user) {
            return { code: 'E400', message: 'Please provide a user_id' }
        }
        const newPost = new Post({
            title, description, image_url, assigned_to: user_id
        });

        const savedPost = await newPost.save();
        user.posts.unshift(savedPost._id);
        await user.save();
        return {
            code: '00', message: {
                info: 'Post created successfully',
                data: savedPost
            }
        }

    } catch (error) {
        console.log({ error })

        return { code: 'E500', message: error.message }
    }
};

module.exports = createPostService;