// app/controller/index.js

const user = require('./user');
const public = require('./public');
const post = require('./post');

module.exports = {
  user, public, post
};
