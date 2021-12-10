'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: 'userId',
        }
      }),
        models.Message.hasMany(models.Comment, {
          foreignKey: { name: 'messageId' }
        })
    }
  };
  Message.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Message',
  });

  //Permet de charger la jointure de la Table User à la table Message au moment de la création du message (Eager Loading)
  Message.addHook('afterCreate', (message, options) => {
    return message.reload()
  })
  return Message;
};

