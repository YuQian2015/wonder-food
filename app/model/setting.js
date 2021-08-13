module.exports = (sequelize, DataTypes) => {
    const { INTEGER, DATE, STRING, ENUM } = DataTypes;
    return sequelize.define('setting', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        type: ENUM('banner'), // 设置类型
        data: STRING(2000), // 设置的静态化数据
        created_at: DATE,
        updated_at: DATE,
    }, {
        // 将createdAt对应到数据库的created_at字段
        createdAt: 'created_at',
        // 将updatedAt对应到数据库的updated_at字段
        updatedAt: 'updated_at',
    });
}