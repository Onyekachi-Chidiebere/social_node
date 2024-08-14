const User = require("../../models/userModel");
const generateToken = require("../../utils/generate-token");
const bcrypt = require('bcrypt')
/**
 * 
 * This handles signing the user in;
 */
const signinService = async ({ props }) => {
    try {
        const { username, password: passwordData } = props;
        //ensure required fields are provided;
        console.log({username,passwordData})
        if (!username || !passwordData)
            return { code: 'E100', message: 'Please provide valid credentials' }

        const user = await User.findOne({ username })
        if (!user)
            return { code: 'E200', message: 'Invalid credentials' }
        const { password, ...userData } = user.toObject();

        // verify user credentials
        const isPasswordCorrect = await bcrypt.compare(passwordData, password);
        if (!isPasswordCorrect)
            return { code: 'E200', message: 'Invalid credentials' }

        const { accessToken, refreshToken } = generateToken({userId:userData._id});


        //send response to controller;
        return { code: '00', message: { accessToken,...userData }, refreshToken }
    } catch (error) {
        return { code: 'E500', message: error.message }
    }
};

module.exports = signinService;