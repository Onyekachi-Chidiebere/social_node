/**
 * this handles all the routes in the application;
 */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');

const signin = require('./controllers/auth/signin');
const refreshToken = require('./controllers/auth/refresh-token');
const createUser = require('./controllers/auth/create-user');
const createPost = require('./controllers/post/create-post');
const updatePost = require('./controllers/post/update-post');
const deletePost = require('./controllers/post/delete-post');
const comment = require('./controllers/post/comment');
const likePost = require('./controllers/post/like-post');
const updateProfile = require('./controllers/profile/update-user');
const getPost = require('./controllers/post/get-post');
const fetchProfile = require('./controllers/profile/fetch-user');
const followUser = require('./controllers/profile/follow-user');


//this handles all the routes in the app
const router = express.Router();

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
router.use(cookieParser());


router.post('/signin', signin);
router.post('/refresh-token', refreshToken);
router.post('/user', createUser);
router.patch('/user', updateProfile);
router.post('/profile', fetchProfile);

router.post('/post', createPost);
router.patch('/post', updatePost);
router.delete('/post', deletePost);
router.get('/post', getPost);

router.post('/comment', comment);
router.post('/like', likePost);
router.post('/follow', followUser);




module.exports = router;
