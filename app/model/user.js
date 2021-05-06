module.exports = (sequelize, DataTypes) => {
    const { INTEGER, DATE, STRING, ENUM } = DataTypes;
    return sequelize.define('user', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(30),
        age: INTEGER,
        email: STRING(200),
        password: STRING, // md5SignValue
        avatar_url: STRING,
        gender: ENUM('男', '女', '保密'), // 性别 0未设置 1男 2女
        role: INTEGER, // 角色
        user_status: INTEGER, // 0 访客 1 正式用户
        created_at: DATE,
        updated_at: DATE,
    }, {
        // 将createdAt对应到数据库的created_at字段
        createdAt: 'created_at',
        // 将updatedAt对应到数据库的updated_at字段
        updatedAt: 'updated_at',
    });
}