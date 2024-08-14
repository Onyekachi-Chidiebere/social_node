const User = require('../../models/userModel');

/**
 * 
 * This handles Updating the user profile;
 */
const updateUserService = async ({ props }) => {
    try {
        const { profile_picture, user_id, location, title } = props;

        console.log({ profile_picture, user_id, location, title });
        if (!user_id) {
            return { code: 'E400', message: 'Please provide a user_id' }
        }
        const user = await User.findByIdAndUpdate(
            user_id,
            { profile_picture, location, title, },
            { new: true, useFindAndModify: false }
        );
        if (!user)
            return { code: 'E200', message: 'Invalid credentials' }
        const { password, ...userData } = user.toObject();

        return {
            code: '00', message: {
                info: 'Profile updated successfully',
                data: userData
            }
        }

    } catch (error) {
        console.log({ error })

        return { code: 'E500', message: error.message }
    }
};

module.exports = updateUserService;