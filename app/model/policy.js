module.exports = (sequelize, DataTypes) => {
    const { INTEGER, DATE, STRING, ENUM } = DataTypes;
    return sequelize.define('policy', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(200),
        api: STRING(256),
        methods: INTEGER, // 0001表示GET，0010表示POST， 0100表示PUT，1000表示DELETE 分别为 1 2 4 8
        created_at: DATE,
        updated_at: DATE,
    }, {
        // 将createdAt对应到数据库的created_at字段
        createdAt: 'created_at',
        // 将updatedAt对应到数据库的updated_at字段
        updatedAt: 'updated_at',
    });
}