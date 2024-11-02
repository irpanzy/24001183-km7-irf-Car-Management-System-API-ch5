"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const auths = [];
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`
    );
    const userIds = users[0];

    for (let i = 0; i < 10; i++) {
      const password = "muria1020";
      const hashedPassword = await bcrypt.hash(password, 10);

      auths.push({
        email: faker.internet.email(),
        password: hashedPassword,
        userId: userIds[i % userIds.length].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Auths", auths, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Auths", null, {});
  },
};