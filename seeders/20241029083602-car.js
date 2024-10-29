"use strict";
const faker = require("@faker-js/faker"); // Pastikan ini adalah import yang benar

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cars = [];

    for (let i = 0; i < 10; i++) {
        const vehicle = faker.vehicle.vehicle(); // Menghasilkan informasi kendaraan
        cars.push({
          brand: vehicle.split(" ")[0], // Mengambil kata pertama sebagai merek
          model: vehicle.split(" ").slice(1).join(" "), // Mengambil sisanya sebagai model
          color: faker.color.human(), // Menggunakan warna dari faker.color.human()
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
