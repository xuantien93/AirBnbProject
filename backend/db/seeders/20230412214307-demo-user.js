'use strict';

const bcrypt = require('bcryptjs')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'Lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Fake',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Fake2',
        lastName: 'User2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'albert@albert.com',
        username: 'Albert1',
        firstName: 'Albert',
        lastName: 'Kim',
        hashedPassword: bcrypt.hashSync('albertpassword')
      },
      {
        email: 'raoult@raoul.com',
        username: 'Raoul1',
        firstName: 'Raoul',
        lastName: 'Andalis',
        hashedPassword: bcrypt.hashSync('raoulpassword')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
