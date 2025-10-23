'use strict';
const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserProfile, { foreignKey: "UserId" });
      User.hasMany(models.Post, { foreignKey: 'UserId' });
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: { msg: "E-mail has already registered!" },
      validate: {
        notEmpty: { msg: "Please insert your email." },
        notNull: { msg: "Please insert your email." },
        isEmail: { msg: "Please insert a valid email address." }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please make a password" },
        notNull: { msg: "Please make a password" },
        len: {
          args: [8, 255],
          msg: "Password must be at least 8 characters long."
        },
        isStrong(value) {
          if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
            throw new Error("Password must contain both letters and numbers.");
          }
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Username is already in use!" },
      validate: {
        notEmpty: { msg: "Please make a username" },
        notNull: { msg: "Please make a username" },
        len: {
          args: [8, 50],
          msg: "Username must be at least 8 characters long."
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    ip: {
      type: DataTypes.STRING,
      defaultValue: "8.8.8.8"
    },
  }, {
    hooks: {
      beforeCreate(instance) {
        if (!instance.ip) { instance.ip = "8.8.8.8"; }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash;
      },
      afterCreate: async (user) => {
        const { UserProfile } = sequelize.models;
        await UserProfile.create({
          UserId: user.id,
          isPrivate: false
        });
      }
    },
    sequelize,
    modelName: 'User',
  });

  return User;
};
