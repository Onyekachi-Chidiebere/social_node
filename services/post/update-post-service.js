const Post = require('../../models/postModel');

/**
 * 
 * This handles updating post;
 */
const updatePostService = async ({ props }) => {
    try {
        const { title, image_url, description, post_id } = props;

        console.log({title, image_url, description, post_id})
        const updatedPost = await Post.findByIdAndUpdate(
            post_id,                   // The ID of the user to update
            { image_url, description, title },               // The data to update
            { new: true, runValidators: true }  // Options: return the updated document, and run validators
        );

        if (updatedPost)
            return {
                code: '00', message: {
                    info: 'Post updated successfully',
                    data: updatedPost
                }
            }

        return {
            code: 'E403', message: 'Unable to update post'
        }

    } catch (error) {
        console.log({ error })

        return { code: 'E500', message: error.message }
    }
};

module.exports = updatePostService;