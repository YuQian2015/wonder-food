### 毕业设计，使用Koa2+MySQL开发的美食+社交系统

毕业设计，使用Koa2+MySQL开发的美食+社交系统，搭建进行API开发的快速开始项目，前后端分离，Vue2开发移动端+管理后台

本项目使用 Koa2 搭建，数据库采用MySQL，主要用于RESTful API的开发，在运行本项目之前，请确认你的环境。

- 安装MySQL，配置好 root 用户和密码，创建好一个用于本项目链接的数据库如：wonder_food。
- 执行 `node -v` 命令查看安装的 Node.js 版本，如果版本较旧，请安装新的稳定版
- 安装 VSCode
- 检测 Git 安装，执行 `git --version` 检测版本，如果没有，请安装 Git

### 如何运行本系统？

本节将对**不了解技术**的同学进行讲解，下面将以 Windows 系统为准进行介绍。

#### 需要安装的软件

##### CMD

Windows 自带的**命令行**工具，使用 win+R 组合快捷键打开输入 cmd 回车之后即可使用，Win 键就是键盘左下角 ctrl 和 alt 之间存在的按键。

##### VSCode

开发和编辑使用的 VSCode，访问 [https://code.visualstudio.com/](https://code.visualstudio.com/)  点击 Download for Windows 就可以下载，下载完成之后点击执行安装即可。

##### Git

Git 可以用来下载拉取代码，提交修改等等，首先需要安装 git，访问 https://git-scm.com/ 下载，然后执行安装，安装完成之后可以在**命令行**执行 `git --version` 命令查看是否安装成功。如下：

```shell
$ git --version

# 结果
git version 2.21.0.windows.1
```

##### Node.js

Node.js 是本项目的服务端开发语言，可以访问 Node.js 的中文网 [http://nodejs.cn/](http://nodejs.cn/) 进行下载，点击下载，来到下载页面 [http://nodejs.cn/download/](http://nodejs.cn/download/) ，作为 Windows 64位用户，可以选择 Windows 安装包 (.msi) 的 64 位3版本进行下载。下载完成之后，可以点击运行下载的 .msi 后缀的安装包执行安装。

安装完成之后，在命令行执行 `node -v` 可以查看安装是否成功：

```shell
$ node -v
v16.13.0
```

#### 获取项目代码

本项目放在 github 上面，[项目地址](https://github.com/YuQian2015/wonder-food)，你可以直接从 github 拉取本项目。在命令行中先进入你的项目开发目录，使用 `git clone` 下载本项目：

```shell
$ git clone https://github.com/YuQian2015/wonder-food.git
```

执行完成之后将获得一个 wonder-food 文件夹，里面就是本项目代码，使用 VSCode 打开这个项目，之后的操作都在 VSCode 中进行。

#### 后台代码

使用 Vue2.x 开发的后台：https://github.com/YuQian2015/wonder-food-admin

#### 移动端代码

Vue2.x+Vant UI 编写的移动端页面：https://github.com/YuQian2015/wonder-food-app

### 安装依赖

本项目使用 sequelize-cli 来创建数据库表，使用 nodemon 来启动开发进程，因此需要安装一系列依赖，在命令行（终端）中执行如下命令安装：

```shell
# 执行命令安装
# 如果你使用 yarn
$ yarn install

# 如果你使用npm
$ npm install 
```

### 配置

将项目根目录下的 .env.example 文件复制一份，并且命名为 .env 文件，这个文件同样放在项目根目录下，并且修改里面的配置信息，示例如下（实际操作时，请忽略 ”#“ 以及后面的备注内容）：

```
APP_IP=127.0.0.1 # 这里是服务启动的IP，一般为本地
APP_PORT=3000 # 这里是服务启动的端口
DB_PASSWORD=moyufed # 这里是本地数据库的密码
DB_HOST=127.0.0.1 # 这里是本地数据库的地址
DB_PORT=3306 # 这里是本地数据库的启动端口
DB_USER=root # 这里是本地数据库的用户名
DB_NAME=wonder_food # 这里是本地数据库的名称
JWT_SECRET=wonder_food # 这里是JWT的SECRET
```

打开 database 目录下的 config.json 文件，这里配置了 sequelize-cli 链接的数据库信息，可以修改为自己的数据库连接，参考备注：

```js
{
  "development": { // 表示这是开发环境数据库
    "username": "root", // 用户名
    "password": "moyufed", // 密码
    "database": "wonder_food", // 数据库名
    "host": "127.0.0.1", // 数据库地址
    "dialect": "mysql"
  }
}
```

### 初始化数据库

在命令行执行如下命令来升级数据库：

```shell
$ npx sequelize db:migrate
```

### 启动服务

在命令行执行如下命令启动开发服务：

```shell
$ npm run dev
# 或
$ yarn dev
```

至此，本接口项目启动成功。

### 开发笔记和其它内容

#### 关于 sequelize-cli

##### 安装

```shell
$ yarn add -D sequelize-cli
```

##### 新建配置文件

在项目根目录新建 .sequelizerc 文件：

```javascript
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

```shell
# 初始化 Migrations 配置文件和目录
$ npx sequelize init:config
$ npx sequelize init:migrations
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

#### MySQL不支持数组类型

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
