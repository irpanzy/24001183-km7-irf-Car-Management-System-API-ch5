"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const superAdminUser = {
      name: faker.name.fullName(),
      age: 20,
      address: faker.location.streetAddress(),
      role: "superadmin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const userResult = await queryInterface.bulkInsert(
      "Users",
      [superAdminUser],
      { returning: true }
    );
    const superAdminUserId = userResult[0].id;

    const password = "superadmin";
    const hashedPassword = await bcrypt.hash(password, 10);

    const superAdminAuth = {
      email: "superadmin@example.com",
      password: hashedPassword,
      userId: superAdminUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await queryInterface.bulkInsert("Auths", [superAdminAuth], {});
  },

  async down(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE role = 'superadmin';`
    );
    const superAdminUserIds = users[0].map((user) => user.id);

    await queryInterface.bulkDelete("Auths", { userId: superAdminUserIds }, {});
    await queryInterface.bulkDelete("Users", { role: "superadmin" }, {});
  },
};