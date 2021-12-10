'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Message, {
        foreignKey: { name: 'userId' }
      })
    }
  };
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    picture: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });

      // User.sync({ alter: true })
      //   .then((data) => {
      //       console.log('Table and Model synced with sucessfully!')
      //   })
      //   .catch((err) => {
      //       console.log('Error syncing the table and model!')
      //   })

  return User;
};