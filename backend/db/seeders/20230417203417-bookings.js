'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: 02 / 15 / 2021,
        endDate: 02 / 17 / 2021
      },
      {
        spotId: 1,
        userId: 1,
        startDate: 05 / 19 / 2021,
        endDate: 05 / 22 / 2021
      },
      {
        spotId: 1,
        userId: 1,
        startDate: 08 / 08 / 2019,
        endDate: 08 / 10 / 2019
      },
      {
        spotId: 2,
        userId: 2,
        startDate: 01 / 5 / 2021,
        endDate: 01 / 10 / 2021
      },
      {
        spotId: 2,
        userId: 2,
        startDate: 04 / 22 / 2021,
        endDate: 04 / 25 / 2021
      },
      {
        spotId: 2,
        userId: 2,
        startDate: 02 / 15 / 2022,
        endDate: 02 / 17 / 2022
      },
      {
        spotId: 3,
        userId: 3,
        startDate: 03 / 20 / 2022,
        endDate: 03 / 25 / 2022
      },
      {
        spotId: 3,
        userId: 3,
        startDate: 07 / 04 / 2022,
        endDate: 07 / 06 / 2022
      },
      {
        spotId: 3,
        userId: 3,
        startDate: 09 / 2 / 2022,
        endDate: 09 / 5 / 2022
      },
      {
        spotId: 4,
        userId: 4,
        startDate: 03 / 1 / 2021,
        endDate: 03 / 3 / 2021
      },
      {
        spotId: 4,
        userId: 4,
        startDate: 01 / 7 / 2019,
        endDate: 01 / 10 / 2019
      },
      {
        spotId: 4,
        userId: 4,
        startDate: 10 / 2 / 2021,
        endDate: 10 / 6 / 2021
      },
      {
        spotId: 5,
        userId: 5,
        startDate: 02 / 15 / 2023,
        endDate: 02 / 17 / 2023
      },
      {
        spotId: 5,
        userId: 5,
        startDate: 04 / 20 / 2023,
        endDate: 04 / 22 / 2023
      },
      {
        spotId: 5,
        userId: 5,
        startDate: 05 / 28 / 2023,
        endDate: 05 / 30 / 2023
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings'
    return await queryInterface.bulkDelete(options, {})
  }
};
