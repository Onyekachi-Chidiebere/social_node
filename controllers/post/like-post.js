const likePostService = require("../../services/post/like-post-service");

/*
this handles liking/unliking post
*/
const likePost = async (req, res) => {
    try {
        //likes from service;
        const response = await likePostService({ props: req.body });

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

module.exports = likePost;