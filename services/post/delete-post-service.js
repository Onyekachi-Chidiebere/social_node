const Post = require('../../models/postModel');
const User = require('../../models/userModel');

/**
 * 
 * This handles deleting post;
 */
const deletePostService = async ({ props }) => {
    try {
        const { post_id } = props;

        if (!post_id) {
            return { code: 'E400', message: 'Please provide a post id' }
        }
        const deletedPost = await Post.findByIdAndDelete(post_id);
        const user = await User.findById(deletedPost.assigned_to);
        const postIndex = user.posts.indexOf(deletedPost._id);
        user.posts.splice(postIndex, 1);
        await user.save();
  
        if (deletedPost)
            return {
                code: '00', message: {
                    info: 'Post deleted successfully',
                    data: deletedPost
                }
            }

            return {
                code: 'E403', message: 'Unable to delete post'
            }

    } catch (error) {
        console.log({ error })

        return { code: 'E500', message: error.message }
    }
};

module.exports = deletePostService;