
const { INTEGER, DATE, STRING, ENUM } = require("sequelize");
const { sequelize } = require('../../config/plugin');
const User = require('./user');

const Post = sequelize.define('post', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING,
    content: STRING,
    type: {
        type: INTEGER,
        defaultValue: 0 // 0 搜索 1 推荐
    },
    images: STRING,
    view_count: {
        type: INTEGER, // 浏览数
        defaultValue: 0
    },
    like_count: {
        type: INTEGER, // 点赞数
        defaultValue: 0
    },
    comment_count: {
        type: INTEGER,
        defaultValue: 0 // 评论数
    },
    created_by: INTEGER,
    created_at: DATE,
    updated_at: DATE,
}, {
    // 将createdAt对应到数据库的created_at字段
    createdAt: 'created_at',
    // 将updatedAt对应到数据库的updated_at字段
    updatedAt: 'updated_at',
});

Post.belongsTo(User, {
    foreignKey: 'created_by',
    targetKey: 'id',
    constraints: false
});

// 一对多
// mode.School.hasMany(mode.User, {
//     foreignKey: 'school_id',
//     sourceKey: 'id',
//     constraints: false
// })

module.exports = Post;