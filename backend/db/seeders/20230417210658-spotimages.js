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
        url: "https://fakeimage.com/1.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://fakeimage.com/2.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://fakeimage.com/3.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://fakeimage.com/4.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://fakeimage.com/5.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://fakeimage.com/6.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://fakeimage.com/7.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://fakeimage.com/8.jpg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://fakeimage.com/9.jpg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://fakeimage.com/10.jpg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://fakeimage.com/11.jpg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://fakeimage.com/12.jpg",
        preview: true
      },
      {
        spotId: 13,
        url: "https://fakeimage.com/13.jpg",
        preview: true
      },
      {
        spotId: 14,
        url: "https://fakeimage.com/14.jpg",
        preview: true
      },
      {
        spotId: 15,
        url: "https://fakeimage.com/15.jpg",
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
