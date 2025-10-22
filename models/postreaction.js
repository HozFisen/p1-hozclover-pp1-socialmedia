'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostReaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    PostReaction.belongsTo(models.Post, { foreignKey: 'PostId' });
    PostReaction.belongsToMany(models.Reaction, { foreignKey: 'ReactionId' });
    }
  }
  PostReaction.init({
    ReadtionId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostReaction',
  });
  return PostReaction;
};