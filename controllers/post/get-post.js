const getPostService = require("../../services/post/get-post-service");

/*
this handles getting post
*/
const getPost = async (req, res) => {
    try {
        //get from service;
        const response = await getPostService({ props: req.cookies });

        if (response.code !== '00') {
            throw new Error(response.message);
        }
        //send response to server;
        return res.status(200).send(response)

    } catch (error) {
        //this handles the error from the server;
        const errorMessage = {
            code: 'E500',
            message: error.message || 'Unable to get post'
        };
        return res.status(400).send(errorMessage);
    }
};

module.exports = getPost;