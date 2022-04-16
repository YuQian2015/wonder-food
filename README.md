## 毕业设计，使用Koa2+MySQL开发的美食+社交系统

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

### 论文截选



#### 服务端技术选型

在系统开发中，后端开发语言使用Koa，Koa的中间件是洋葱模型，使用起来简单优雅，通过中间件来控制用户鉴权、日志记录、权限控制等都非常方便。



#### 数据库

数据库在MongoDB和MySQL中选择了MySQL，对应地将会使用到对象关系映射sequelize，有了 sequelize 之后就不用再去写比较原生的 SQL 语句，却而代之的是使用更加面向对象地方式去操作数据库。




#### 前端技术选型

前端开发涉及到两个模块，一个是管理后台，一个是移动端应用，均采取Vue来实现，但是在UI框架选项上稍有不同，横向对比各大厂商的UI组件：

- Mint UI——饿了么开源的移动端UI组件库，能够满足日常的移动端开发需求，长期没有维护、组件功能少、文档简单。
- Vant——有赞前端团队基于有赞统一的规范实现的 Vue 组件库，提供了一整套 UI 基础组件和业务组件。
- Cube UI——滴滴团队开发的基于 Vue.js 实现的精致移动端组件库。支持按需引入和后编译，轻量灵活；扩展性强，可以方便地基于现有组件实现二次开发。
- Muse UI——基于 Vue 2.0 优雅的 Material Design UI 组件库，基本实现 Material Design 设计规范类的所有组件，另外还开发许多新的功能特性。
- NutUI——京东自研的轻量级移动端Vue组件库，开发和服务于移动Web界面的企业级前中后台产品。
- VUX——个人维护一个凑合的 Vue.js 移动端 UI 组件库，Start数较高，由于是个人维护，可靠性较低，最后一次更新一年前。

经过权衡，选择了Vant作为移动端端的UI组件库，有小程序版本,可以平滑兼容小程序web和app，对于管理后台来说，在PC上使用的场景较多，因此采用 element-ui 作为组件库。



#### 后端功能实现

后端将采用纯API的形式提供服务，因此将于基于传统的MVC模型，抽离出API路由作为RESTful接口，并且为了应对厚重的业务逻辑，增加了Service来进行处理。因此，在整个后端逻辑中，所有的前端请求都将先经过中间件和路由，再通过Controller进行处理，而在操作Model进行数据库交互之前，都会由Service来进行业务处理。



#### 数据库操作

在开发过程中将使用 sequelize-cli 来创建表，同时可以管理数据库的升级和降级，减少人工写命令行代码的时间，提高效率，因此在项目中安装了 sequelize-cli 作为开发环境依赖。

在数据库管理上，通过 sequelize 作为对象关系映射，它将提供一个连接数据库的构造函数，在构造好连接实例之后，就可以通过该实例来创建Model以及相关的CRUD。



#### Model的自动挂载

Node.js赋予JavaScript文件操作的能力，为了实现自动挂载model，将通过node.js的fs文件系统来统一读取model文件，在读取到文件之后，记录下文件名并且引入这些文件，然后将创建好的 sequelize 实例传递给每一个文件进行model定义，定义好的model可以提供对应的api来实现增删查改。




####  中间件挂载实例

中间件是Koa中的一大特色，中间件的代码逻辑运行在用户请求和响应之间，每次请求都会有一个上下文被创建，这个上下文将在中间件和业务代码之间流动。为了更加便捷得使用model、controller、service，新增一个中间件，将创建好的model、controller、service到上下文上，然后在任何业务代码需要使用的时候，就能通过上下文直接取到。




#### RESTful API设计


RESTful是一种设计风格，被广泛的应用到web开发中，总结起来有以下几点约定事项：

- 使用api二级域名或者api作为前缀的路由
- 使用合理的请求方式来处理对应业务，比如 GET 获取数据，POST修改数据
- 遵循参数传递的规则，query、params和body要有所区分

以发帖接口为例，接口设计风格应该如表 4-1 所示：

| 类型   | 地址                   | 描述                       | 返回内容     |
| ------ | ---------------------- | -------------------------- | ------------ |
| GET    | /api/v1/posts          | 用来获取帖子列表           | 帖子列表数组 |
| POST   | /api/v1/posts          | 用来新建帖子               | 帖子详情     |
| GET    | /api/v1/posts/:id      | 用来获取某一帖子的详细信息 | 帖子详情     |
| PUT    | /api/v1/posts/:id      | 用来更新某一帖子的全部信息 | 帖子详情     |
| PATCH  | /api/v1/posts/:id      | 用来更新某一帖子的部分信息 | 帖子详情     |
| DELETE | /api/v1/posts/:id      | 删除某一帖子               | 空对象       |
| GET    | /api/v1/posts/:id/tags | 获取某一帖子的标签列表     | 标签列表     |



#### 中间件设计

Koa的核心之一就是中间件的挂载和使用，它为开发提供极大便利，中间件的功能多种多样，下面是揾食的后端使用的中间件：

1. 静态资源服务中间件koa-static——用于启动静态资源服务器，利于本地开发，方便预览上传的图片
2. 路由中间件koa-router——用于将请求匹配到处理逻辑，是RESTful接口开发重要的一环
3. 日志中间件logger——自定义的中间件，引入了log4js来进行日志记录
4. 跨源资源共享中间件koa-cors——可以提供跨域配置，包括自定义允许的请求方式和允许的源等等
5. 响应中间件response_handler——自定义的中间件，为上下文挂载一个设置响应的方法，它可以提供标准的响应格式
6. 模型挂载中间件model_tool——自定义的中间件，它不光为上下文挂载了定义的model，还支持挂载service和controller
7. JWT处理中间件jwt_handler——自定义的中间件，用于处理用户token验证的响应数据
8. JWT中间件 koa-jwt——用于处理JSON Web Token的中间件，用来做用户验证



#### 关键环节的处理方式

路由模块化开发，通过将不同业务的路由查分到不同的文件来js实现，不同的文件都引入了路由中间件来进行请求匹配，最终再进行汇总，实现一个嵌套式的路由模块。

Controller结构化，通过路由模块指定请求接口到controller，Controller再根据RESTful的风格，设计通用的处理方法，如下：

- view——GET请求，查看详情
- index——GET请求，查看列表
- create——POST请求，创建记录
- update——PUT请求，更新记录
- destroy——DELETE请求，删除记录

日志记录，通过log4js来实现日志输出，并且支持以文件的方式来进行追加，再加上配置，可以按照日期来规范文件名格式。

跨域设置，通过cors中间件，统一管理跨域，现阶段采用默认设置，将会在响应头追加允许跨域，方便不同源的站点访问后端服务。

用户鉴权，通过后台引入JWT中间件，在用户登录或注册成功之后，签发携带用户ID的token返回到前端，以后前端请求接口时，会在请求头携带该token访问接口，最后由中间件解析该token获取用户信息，从而达成用户验证。




#### 前端交互实现

前端需要开放两个项目：揾食移动端应用和后台管理系统，移动端应用采用移动端UI组件库Vant，后台系统采用element-ui组件库。

移动端和后台都使用 vue-router 开发路由、使用 localforage 库类支持本地持久化、使用dayjs 来进行日期转换、使用 axios 发送请求。



#### 模块设计

通过 vue-router 设计路由，大致将前端页面分为：登录注册、用户信息、社区、发帖推荐、商家管理、商品管理、角色管理等模块。



#### 拦截器设计

通过调用 axios 的拦截器设置方法，可以为请求的发送添加拦截处理，在用户登录成功之后，会使用 localforage 库在本地持久化用户的token，在拦截器中获取该token，并且添加到每次请求的请求头。

拦截器本身支持对响应进行处理，因此在将响应返回到前端业务之前，判断响应本身的状态以及业务code，若发现异常，则统一提示响应数据里面的错误信息message。



#### 状态码处理

401处理：在接收后端响应之后，能获得状态码，若状态码是401则表示用户登录失效，前端会发送自定义事件通知应用跳转到登录界面。

403处理：由于token记录了用户信息，在后端获取到用户信息之后，会判断用户权限，如果用户没有对应的操作权限，后端返回403状态码，前端接收到响应之后，提示相关信息。

500处理：500状态码是由于后台出错导致，前端统一提示系统错误。



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
