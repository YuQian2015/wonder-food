module.exports = (sequelize, DataTypes) => {
    const { INTEGER, DATE, STRING, ENUM } = DataTypes;
    return sequelize.define('comment', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        content: STRING(512),
        images: STRING,
        type: INTEGER,
        comment_id: INTEGER,
        store_id: INTEGER,
        product_id: INTEGER,
        post_id: INTEGER,
        created_by: INTEGER,
        created_at: DATE,
        updated_at: DATE,
    }, {
        // 将createdAt对应到数据库的created_at字段
        createdAt: 'created_at',
        // 将updatedAt对应到数据库的updated_at字段
        updatedAt: 'updated_at',
    });
}