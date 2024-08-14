const User = require('../../models/userModel');

/**
 * 
 * This handles fetching the user profile;
 */
const fetchUserService = async ({ props }) => {
    try {
        const { user_id, } = props;

        if (!user_id) {
            return { code: 'E400', message: 'Please provide a user_id' }
        }
        const user = await User.findById(user_id)
            .populate({
                path: 'posts',
                populate: {
                    path: 'assigned_to',
                }
            })
            .exec();
        if (!user)
            return { code: 'E200', message: 'Invalid user_id' }
        const { password, ...userData } = user.toObject();

        return {
            code: '00', message: {
                info: 'Profile fetched successfully',
                data: userData
            }
        }

    } catch (error) {
        console.log({ error })

        return { code: 'E500', message: error.message }
    }
};

module.exports = fetchUserService;