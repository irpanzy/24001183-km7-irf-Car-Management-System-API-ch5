'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    static associate(models) {
      Cars.belongsTo(models.Users, { foreignKey: "createdBy", as: "creator" });
      Cars.belongsTo(models.Users, { foreignKey: "updatedBy", as: "updater" });
      Cars.belongsTo(models.Users, { foreignKey: "deletedBy", as: "deleter" });
    }
  }
  Cars.init({
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Cars',
  });
  return Cars;
};