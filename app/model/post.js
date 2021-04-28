
const { INTEGER, DATE, STRING, ENUM } = require("sequelize");
const { sequelize } = require('../../config/plugin');

const Post = sequelize.define('post', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    created_by: INTEGER,
    title: STRING,
    content: STRING,
    type: {
        type: STRING,
        defaultValue: 0 // 0 发布帖子内容 1 回复
    },
    images: STRING,
    created_at: DATE,
    updated_at: DATE,
}, {
    // 将createdAt对应到数据库的created_at字段
    createdAt: 'created_at',
    // 将updatedAt对应到数据库的updated_at字段
    updatedAt: 'updated_at',
});

module.exports = Post;