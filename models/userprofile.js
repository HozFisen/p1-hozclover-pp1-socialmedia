'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfile.belongsTo(models.User, {foreignKey:"UserId"})
    }
  }
  UserProfile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    tagLine: DataTypes.STRING(50),
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    },
    profilePicture: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};