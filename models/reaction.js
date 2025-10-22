'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reaction.belongsToMany(models.Post, {foreignKey:"PostId"})
    }
  }
  Reaction.init({
    name: DataTypes.STRING,
    point: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reaction',
  });
  return Reaction;
};