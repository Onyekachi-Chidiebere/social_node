const Post = require('../../models/postModel');
const User = require('../../models/userModel');

/**
 * 
 * This handles liking and unliking post;
 */
const likePostService = async ({ props }) => {
    try {
        const { user_id, post_id } = props;

        if (!user_id) {
            return { code: 'E400', message: 'Please provide a user_id' }
        }
        if (!post_id) {
            return { code: 'E400', message: 'Please provide a post_id' }
        }
        const post = await Post.findById(post_id);

        if (!post) {
            return { code: 'E400', message: 'Please provide a post id' }
        }

        const likeIndex = post.likes.indexOf(user_id);

        if (likeIndex == -1) {
            // If the follower ID is not in the array, add it
            post.likes.push(user_id);
            await post.save();
            return {
                code: '00', message: {
                    info: 'Updated successfully',
                    data: true
                }
            }
        } else {
            // If the follower ID is already in the array, remove it
            post.likes.splice(likeIndex, 1);
            await post.save();
            return {
                code: '00', message: {
                    info: 'Updated successfully',
                    data: false
                }
            }
        }

    } catch (error) {
        console.log({ error })

        return { code: 'E500', message: error.message }
    }
};

module.exports = likePostService;