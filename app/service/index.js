// app/service/index.js

const userService = require('./user');
const postService = require('./post');
const commentService = require('./comment');


module.exports = {
    userService, postService, commentService
};