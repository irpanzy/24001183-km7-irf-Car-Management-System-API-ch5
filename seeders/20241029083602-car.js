"use strict";
const { faker } = require("@faker-js/faker"); // Pastikan ini adalah import yang benar

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cars = [];

    for (let i = 0; i < 10; i++) {
      const brand = faker.vehicle.manufacturer(); // Menghasilkan nama merek kendaraan
      const model = faker.vehicle.model(); // Menghasilkan model kendaraan
      const color = faker.vehicle.color(); // Menghasilkan warna kendaraan

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
