'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PostReactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ReactionId: {
      type: Sequelize.INTEGER,
      references: {
        allowNull:false,
        model: 'Reactions',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
      PostId: {
        allowNull:false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Posts',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
      UserId: {
        allowNull:false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PostReactions');
  }
};