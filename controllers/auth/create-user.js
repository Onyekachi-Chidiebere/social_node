const createUserService = require("../../services/auth/create-user-service");

/*
this handles creating user account
*/
const createUser = async (req, res) => {
    try {
        //create from service;
        const response = await createUserService({ props: req.body });

        if (response.code !== '00') {
            throw new Error(response.message);
        }
        //send response to server;
        return res.status(200).send(response)

    } catch (error) {
        //this handles the error from the server;
        const errorMessage = {
            code: 'E500',
            message: error.message || 'Unable to update profile'
        };
        return res.status(400).send(errorMessage);
    }
};

module.exports = createUser;