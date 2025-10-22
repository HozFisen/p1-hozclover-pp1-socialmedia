'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {foreignKey:'UserId'})
      Post.hasOne(models.Category, {foreignKey:'CategoryId'})
      Post.hasMany(models.PostReaction, {foreignKey:"PostId"})
      Post.belongsToMany(models.Post, {through:models.PostReaction, foreignKey:'PostId'})

      
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    CategoryId:DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};