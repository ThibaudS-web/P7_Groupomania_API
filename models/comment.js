'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Comment.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false,
                    name: 'userId'
                },
                onDelete: "cascade"
            }),
                models.Comment.belongsTo(models.Message, {
                    foreignKey: {
                        allowNull: false,
                        name: 'messageId'
                    },
                    onDelete: "cascade"
                })
        }
    };
    Comment.init({
        content: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Comment',
    });

    Comment.addHook('afterCreate', (comment, options) => {
        return comment.reload()
      })
      
    return Comment;
};