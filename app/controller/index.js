// app/controller/index.js

const user = require('./user');
const public = require('./public');
const post = require('./post');
const upload = require('./upload');

module.exports = {
  user, public, post, upload
};
