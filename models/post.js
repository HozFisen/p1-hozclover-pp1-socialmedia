'use strict';

// For getting location
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
      Post.belongsToMany(models.Reaction, {through:models.PostReaction, foreignKey:'PostId'})
    }
    // Getter 
    get formatDate() {
      formatDate = new Date(this.date).toISOString().split('T')[0]
      return formatDate
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    date: DataTypes.DATE,
    CategoryId:DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};