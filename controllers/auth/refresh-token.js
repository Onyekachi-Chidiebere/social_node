const refreshTokenService = require("../../services/auth/refresh-token-service");

/*
this handles refreshing user token
*/
const refreshToken = async (req, res) => {
    try {
        //signin from service;
        const response = await refreshTokenService({ props: req.cookies });

        if (response.code !== '00') {
            throw new Error(response.message);
        }
        //send response to server;
        return res.status(200).send(response)

    } catch (error) {
        //this handles the error from the server;
        const errorMessage = {
            code: 'E500',
            message: error.message || 'Unable to sign in user'
        };
        return res.status(400).send(errorMessage);
    }
};

module.exports = refreshToken;