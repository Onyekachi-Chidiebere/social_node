const User = require('../../models/userModel');
const bcrypt = require('bcrypt')

/**
 * 
 * This handles creating the user profile;
 */
const createUserService = async ({ props }) => {
    try {
        const { username, email,  password, confirm_password } = props;

        if (!username) {
            return { code: 'E400', message: 'Please provide a username' }
        }
        if (!email) {
            return { code: 'E400', message: 'Please provide an email' }
        }
        if (!password) {
            return { code: 'E400', message: 'Please provide password' }
        }
        if (!confirm_password) {
            return { code: 'E400', message: 'Please provide confirm_password' }
        }
        if (password != confirm_password) {
            return { code: 'E400', message: 'Passwords do not match' }
        }
        const username_taken = await User.findOne({ username })
        if (username_taken)
            return { code: 'E400', message: 'Username already taken' }
        const email_taken = await User.findOne({ email })
        if (email_taken)
            return { code: 'E400', message: 'Email already taken' }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
            username, email, password:hash
        });

        const savedUser = await newUser.save();
        return {
            code: '00', message: {
                info: 'account created successfully',
                data: savedUser
            }
        }

    } catch (error) {
        console.log({ error })

        return { code: 'E500', message: error.message }
    }
};

module.exports = createUserService;