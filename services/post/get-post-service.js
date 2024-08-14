const Post = require('../../models/postModel');

/**
 * 
 * This handles getting post;
 */
const getPostService = async ({ props }) => {
    try {


        const posts = await Post.find().sort({ created_at: -1 }).populate('assigned_to').populate('comments.user');

        return {
            code: '00', message: {
                info: 'Post fetched successfully',
                data: posts
            }
        }



    } catch (error) {
        console.log({ error })

        return { code: 'E500', message: error.message }
    }
};

module.exports = getPostService;