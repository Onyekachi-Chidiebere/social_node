const User = require('../../models/userModel');

/**
 * This handles following or unfollowing a user.
 */
const followUserService = async ({ props }) => {
    try {
        const { user_id, follower_id } = props;

        if (!user_id) {
            return { code: 'E400', message: 'Please provide a user_id' };
        }
        if (!follower_id) {
            return { code: 'E400', message: 'Please provide a follower_id' };
        }

        const user = await User.findById(user_id);
        const follower = await User.findById(follower_id);

        if (!user) {
            return { code: 'E404', message: 'User not found' };
        }
        if (!follower) {
            return { code: 'E404', message: 'Follower not found' };
        }

        // Ensure followers and following arrays are initialized
        user.followers = user.followers || [];
        follower.following = follower.following || [];

        const followerIndex = user.followers.indexOf(follower_id);
        const followingIndex = follower.following.indexOf(user_id);

        if (followerIndex === -1) {
            // If the follower ID is not in the array, add it
            user.followers.push(follower_id);
            follower.following.push(user_id);

            await user.save();
            await follower.save();

            return {
                code: '00',
                message: {
                    info: 'Updated successfully',
                    data: true // User is now being followed
                }
            };
        } else {
            // If the follower ID is already in the array, remove it
            user.followers.splice(followerIndex, 1);
            follower.following.splice(followingIndex, 1);

            await user.save();
            await follower.save();

            return {
                code: '00',
                message: {
                    info: 'Updated successfully',
                    data: false // User is now unfollowed
                }
            };
        }
    } catch (error) {
        console.error({ error });

        return { code: 'E500', message: error.message };
    }
};

module.exports = followUserService;
