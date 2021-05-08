module.exports = (sequelize, DataTypes) => {
    const { INTEGER, DATE, STRING, ENUM } = DataTypes;
    return sequelize.define('role', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: {
            type: STRING(200),
            unique: true
        },
        key: {
            type: STRING(200),
            unique: true
        },
        created_at: DATE,
        updated_at: DATE,
    }, {
        // 将createdAt对应到数据库的created_at字段
        createdAt: 'created_at',
        // 将updatedAt对应到数据库的updated_at字段
        updatedAt: 'updated_at',
    });
}