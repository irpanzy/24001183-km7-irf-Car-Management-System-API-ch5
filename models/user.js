"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasOne(models.Auth, { foreignKey: "userId", as: "auth" });
      Users.hasMany(models.Cars, { foreignKey: "createdBy", as: "createdCars" });
      Users.hasMany(models.Cars, { foreignKey: "updatedBy", as: "updatedCars" });
      Users.hasMany(models.Cars, { foreignKey: "deletedBy", as: "deletedCars" });
    }
  }

  Users.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
      address: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("admin", "superadmin", "member"),
        allowNull: false,
        defaultValue: "member",
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  return Users;
};