const Post = require('../../models/postModel');

/**
 * 
 * This handles updating post;
 */
const commentService = async ({ props }) => {
    try {
        const { user, comment, post_id } = props;

        //ensure required fields are provided;
        if (!user)
            return { code: 'E400', message: 'Please provide a user id' }
        if (!comment)
            return { code: 'E400', message: 'Please provide a comment' }
        if (!post_id)
            return { code: 'E400', message: 'Please provide a post id' }


        const newComment = {
            user,
            comment,
            timestamp: new Date()
        };
        const updatedPost = await Post.findByIdAndUpdate(
            post_id,
            { $push: { comments: newComment } },
            { new: true, runValidators: true }
        ).populate('comments.user');
        if (updatedPost)
            return {
                code: '00', message: {
                    info: 'Comment added successfully',
                    data: updatedPost
                }
            }

        return {
            code: 'E403', message: 'Unable to add comment post'
        }

    } catch (error) {
        console.log({ error })

        return { code: 'E500', message: error.message }
    }
};

module.exports = commentService;