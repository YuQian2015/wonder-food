const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { sequelize } = require('../../config/plugin');

let files = fs.readdirSync(path.resolve(__dirname)); //同步遍历目录

let modelFiles = files.filter((f) => {
    return f.endsWith('.js');
}, files);

let model = {};

function firstToUpper(str) {
    return str.replace(str[0], str[0].toUpperCase());
}

console.log(`导入model...`);
for (let f of modelFiles) {
    let name = f.substring(0, f.length - 3); //user.js ==> name : user
    if (name === 'index') {
        continue;
    }

    model[firstToUpper(name)] = require(path.resolve(__dirname, f))(sequelize, Sequelize);
    // model[firstToUpper(name)] = sequelize.import(path.resolve(__dirname, f));
}

// 建立对应关系
const { Post, User, Comment, Store, Product } = model;

// 一对一
Post.belongsTo(User, {
    foreignKey: 'created_by',
    targetKey: 'id',
    constraints: false
});

// 一对多
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    sourceKey: 'id',
    constraints: false
})

Comment.belongsTo(Store, {
    foreignKey: 'store_id',
    targetKey: 'id',
    constraints: false
});

Comment.hasOne(Product, {
    foreignKey: 'id',
    sourceKey: 'product_id',
    constraints: false
});

Comment.belongsTo(User, {
    foreignKey: 'created_by',
    targetKey: 'id',
    constraints: false
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    targetKey: 'id',
    constraints: false
});

Comment.belongsTo(Comment, {
    foreignKey: 'comment_id',
    targetKey: 'id',
    constraints: false
});

Product.belongsTo(Store, {
    foreignKey: 'store_id',
    targetKey: 'id',
    constraints: false
});

module.exports = model;

