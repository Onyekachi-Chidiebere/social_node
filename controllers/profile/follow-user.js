const followUserService = require("../../services/profile/follow-user-service");

/*
this handles following user profile
*/
const followUser = async (req, res) => {
    try {
        //update from service;
        const response = await followUserService({ props: req.body });

        if (response.code !== '00') {
            throw new Error(response.message);
        }
        //send response to server;
        return res.status(200).send(response)

    } catch (error) {
        //this handles the error from the server;
        const errorMessage = {
            code: 'E500',
            message: error.message || 'Unable to follow profile'
        };
        return res.status(400).send(errorMessage);
    }
};

module.exports = followUser;