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
      User.hasOne(models.UserProfile, {foreignKey:"UserId"})
      User.belongsToMany(models.Post, {foreignKey:"UserId"})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{msg: "Please insert your email."},
        notNull:{msg: "Please insert your email."}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{msg: "Please make a password"},
        notNull:{msg: "Please make a password"}
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{msg: "Please make a username"},
        notNull:{msg: "Please make a username"}
      }
    },
    role: { // Harus default ke user.
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};