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
    Post.belongsTo(models.User, { foreignKey: 'UserId' });

    Post.hasMany(models.PostReaction, { foreignKey: 'PostId' });

    // Many-to-many through PostReaction
    Post.belongsToMany(models.User, { 
        through: models.PostReaction, 
        foreignKey: 'PostId', 
        otherKey: 'UserId', 
        as: 'ReactedUsers' 
    });
}
    // Getter or static method
    get formatDate() {
    const formatted = new Date(this.createdAt).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  return formatted;
}

  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{msg: "Please make a title"},
        notNull:{msg: "Please make a title"}
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty:{msg: "Please fill content"},
        notNull:{msg: "Please fill content"}
      }
    },
    imageUrl:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{msg: "Please make a image url"},
        notNull:{msg: "Please make a image url"}
      }
    },
    likes: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    CategoryId:DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};