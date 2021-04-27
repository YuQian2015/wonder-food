### 使用 koa 搭建的快速开始项目

使用 koa 搭建的快速开始项目，用于开发 API

### 关于 sequelize-cli

#### 安装

```
yarn add  -D sequelize-cli
```

#### 新建配置文件

在项目根目录新建 .sequelizerc 文件：

```
'use strict';

const path = require('path');

module.exports = {
  config: path.join(__dirname, 'database/config.json'),
  'migrations-path': path.join(__dirname, 'database/migrations'),
  'seeders-path': path.join(__dirname, 'database/seeders'),
  'models-path': path.join(__dirname, 'app/model'),
};

```

编写好配置之后，执行命令生成配置目录：

```
初始化 Migrations 配置文件和目录
npx sequelize init:config
npx sequelize init:migrations
```

执行完后会生成 database/config.json 文件和 database/migrations 目录，我们修改一下 database/config.json 中的内容，将其改成我们项目中使用的数据库配置：

```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```

此时 sequelize-cli 和相关的配置也都初始化好了，我们可以开始编写项目的第一个 Migration 文件来创建我们的一个 users 表了。

```
npx sequelize migration:generate --name=init-users
```

执行完后会在 database/migrations 目录下生成一个 migration 文件(${timestamp}-init-users.js)，我们修改它来处理初始化 users 表：

```
# 升级数据库
npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all
```

mysql 不支持数组类型

```
images: {
  type: STRING,
  allowNull: true,
  get() {
    return this.getDataValue('images').split(',');
  },
  set(value) {
    return this.setDataValue('images', value.join(','))
  }
}
```
