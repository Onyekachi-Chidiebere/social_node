const fetchUserService = require("../../services/profile/get-profie-service");
const updateUserService = require("../../services/profile/update-user-service");

/*
this handles updating user profile
*/
const fetchProfile = async (req, res) => {
    try {
        //update from service;
        const response = await fetchUserService({ props: req.body });

        if (response.code !== '00') {
            throw new Error(response.message);
        }
        //send response to server;
        return res.status(200).send(response)

    } catch (error) {
        //this handles the error from the server;
        const errorMessage = {
            code: 'E500',
            message: error.message || 'Unable to fetch profile'
        };
        return res.status(400).send(errorMessage);
    }
};

module.exports = fetchProfile;