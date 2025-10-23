'use strict';
const bcrypt = require('bcryptjs')

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
      User.hasMany(models.Post, {foreignKey:'UserId'})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique:true,
      validate: {
        notEmpty:{msg: "Please insert your email."},
        notNull:{msg: "Please insert your email."},
        unique:{msg: "E-mail has already registered!"}
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
      unique:true,
      validate: {
        notEmpty:{msg: "Please make a username"},
        notNull:{msg: "Please make a username"},
        unique:{msg: "Username is already Taken!"}
      }
    },
    role: { // Harus default ke user.
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      // Encrypts password before storing
      beforeCreate() {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};