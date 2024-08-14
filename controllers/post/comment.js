const commentService = require("../../services/post/comment-service");

/*
this handles commenting on post
*/
const comment = async (req, res) => {
    try {
        //creates from service;
        const response = await commentService({ props: req.body });

        if (response.code !== '00') {
            throw new Error(response.message);
        }
        //send response to server;
        return res.status(200).send(response)

    } catch (error) {
        //this handles the error from the server;
        const errorMessage = {
            code: 'E500',
            message: error.message || 'Unable to comment on post'
        };
        return res.status(400).send(errorMessage);
    }
};

module.exports = comment;