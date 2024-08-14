const signinService = require("../../services/auth/signin-service");

/*
this handles signing in
*/
const signin = async (req, res) => {
    try {
        //signin from service;
        const response = await signinService({ props: req.body });

        if (response.code !== '00') {
            throw new Error(response.message);
        }
        //send response to server;
        return res.cookie('refreshToken', response.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 1000, // 2 hours
        }).status(200).send({ code: '00', message: response.message })

    } catch (error) {
        //this handles the error from the server;
        const errorMessage = {
            code: 'E500',
            message: error.message || 'Unable to sign in user'
        };
        return res.status(400).send(errorMessage);
    }
};

module.exports = signin;