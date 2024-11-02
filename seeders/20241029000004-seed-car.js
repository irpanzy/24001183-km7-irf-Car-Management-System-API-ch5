"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cars = [];

    for (let i = 0; i < 10; i++) {
      const brand = faker.vehicle.manufacturer(); 
      const model = faker.vehicle.model(); 
      const color = faker.vehicle.color(); 

      cars.push({
        brand: brand,
        model: model,
        color: color,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Cars", cars, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cars", null, {});
  },
};
