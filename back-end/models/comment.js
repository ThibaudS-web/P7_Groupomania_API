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
                }
            }),
                models.Comment.belongsTo(models.Message, {
                    foreignKey: {
                        allowNull: false,
                        name: 'messageId'
                    }
                })
        }
    };
    Comment.init({
        content: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        messageId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Comment',
    });

    Comment.sync({ alter: true })
        .then((data) => {
            console.log('Table and Model synced with sucessfully!')
        })
        .catch((err) => {
            console.log('Error syncing the table and model!')
        })




    return Comment;
};