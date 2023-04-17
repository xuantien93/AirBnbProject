'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    return await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "https://fakereview.com/"
      },
      {
        reviewId: 2,
        url: "https://fakereview.com/"
      },
      {
        reviewId: 3,
        url: "https://fakereview.com"
      },
      {
        reviewId: 4,
        url: "https://fakereview.com"
      },
      {
        reviewId: 5,
        url: "https://fakereview.com"
      },
      {
        reviewId: 6,
        url: "https://fakereview.com"
      },
      {
        reviewId: 7,
        url: "https://fakereview.com"
      },
      {
        reviewId: 8,
        url: "https://fakereview.com"
      },
      {
        reviewId: 9,
        url: "https://fakereview.com"
      },
      {
        reviewId: 10,
        url: "https://fakereview.com"
      },
      {
        reviewId: 11,
        url: "https://fakereview.com"
      },
      {
        reviewId: 12,
        url: "https://fakereview.com"
      },
      {
        reviewId: 13,
        url: "https://fakereview.com"
      },
      {
        reviewId: 14,
        url: "https://fakereview.com"
      },
      {
        reviewId: 15,
        url: "https://fakereview.com"
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
    options.tableName = 'ReviewImages'
    return await queryInterface.bulkDelete(options, {})
  }
};
