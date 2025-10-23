'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasOne(models.UserProfile, {foreignKey:"UserId"})
      User.hasMany(models.Post, {foreignKey:'UserId'})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique:{msg: "E-mail has already registered!"},
      validate: {
        notEmpty:{msg: "Please insert your email."},
        notNull:{msg: "Please insert your email."},
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
      unique:{msg: "Username is already in use!"},
      validate: {
        notEmpty:{msg: "Please make a username"},
        notNull:{msg: "Please make a username"},
      }
    },
    role: { // Harus default ke user.
      type: DataTypes.STRING,
      defaultValue:'user'
    },
    ip: {
      type:DataTypes.STRING,
      defaultValue:"8.8.8.8"
    },
  }, {
    hooks: {
      // Encrypts password before storing
      beforeCreate(instance) {
        if (!instance.ip) {instance.ip = "8.8.8.8"}
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      },
      // Creates user profile
      afterCreate: async (user, options) => {
      const { UserProfile } = sequelize.models;
      await UserProfile.create({
        UserId: user.id,   // matches your foreignKey
        isPrivate: false   // default value
      });
    }
    },
  
    sequelize,
    modelName: 'User',
  });
  return User;
};