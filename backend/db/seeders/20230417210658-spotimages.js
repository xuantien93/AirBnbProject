'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://i.imgur.com/WhTOyTB.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/HBFc0Rx.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://i.imgur.com/rcyq3w4.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://i.imgur.com/SiGQ5k5.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://i.imgur.com/2tk5ZcW.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://i.imgur.com/Gf6tqu9.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://i.imgur.com/qCPdZG6.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://i.imgur.com/P8kCjm1.jpg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://i.imgur.com/W0pe8Cl.jpg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://i.imgur.com/qhsfg7p.jpg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://i.imgur.com/5BSKBlO.jpg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://i.imgur.com/K2P6xT1.jpg",
        preview: true
      },
      {
        spotId: 13,
        url: "https://i.imgur.com/Pc1JxH6.jpg",
        preview: true
      },
      {
        spotId: 14,
        url: "https://i.imgur.com/LOGXLrA.jpg",
        preview: true
      },
      {
        spotId: 15,
        url: "https://i.imgur.com/hiwXT1C.jpg",
        preview: true
      },

    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages'
    return queryInterface.bulkDelete(options, {})
  }
};
