const deletePostService = require("../../services/post/delete-post-service");

/*
this handles deleting post
*/
const deletePost = async (req, res) => {
    try {
        //creates from service;
        const response = await deletePostService({ props: req.body });

        if (response.code !== '00') {
            throw new Error(response.message);
        }
        //send response to server;
        return res.status(200).send(response)

    } catch (error) {
        //this handles the error from the server;
        const errorMessage = {
            code: 'E500',
            message: error.message || 'Unable to delete post'
        };
        return res.status(400).send(errorMessage);
    }
};

module.exports = deletePost;