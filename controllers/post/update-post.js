const updatePostService = require("../../services/post/update-post-service");

/*
this handles deleting post
*/
const updatePost = async (req, res) => {
    try {
        //creates from service;
        const response = await updatePostService({ props: req.body });

        if (response.code !== '00') {
            throw new Error(response.message);
        }
        //send response to server;
        return res.status(200).send(response)

    } catch (error) {
        //this handles the error from the server;
        const errorMessage = {
            code: 'E500',
            message: error.message || 'Unable to update post'
        };
        return res.status(400).send(errorMessage);
    }
};

module.exports = updatePost;