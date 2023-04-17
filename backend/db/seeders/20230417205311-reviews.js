'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'very pleasant stay, service was excellent. Definitely will return',
        stars: 5
      }, {
        spotId: 1,
        userId: 1,
        review: 'The location was nice, but the place was a bit run-down and in need of some updates.',
        stars: 3
      },
      {
        spotId: 1,
        userId: 1,
        review: 'Absolutely amazing! The staff went above and beyond to make our stay unforgettable.',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'The room was a bit small and cramped, but overall it was a decent stay.',
        stars: 3
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Incredible views and a truly unique experience!',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'The accommodations were comfortable, but the price was a bit steep for what we got.',
        stars: 3
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Great location and excellent service!',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'We had a few issues with the room, but the staff was very accommodating and resolved them quickly.',
        stars: 3
      },
      {
        spotId: 3,
        userId: 3,
        review: 'The house was spacious and well-equipped, and the host was very friendly and helpful.',
        stars: 4
      },
      {
        spotId: 4,
        userId: 4,
        review: 'The cleanliness of the house could have been better, but it was overall a decent stay.',
        stars: 3
      },
      {
        spotId: 4,
        userId: 4,
        review: 'A truly luxurious experience! The amenities were top-notch and the views were breathtaking.',
        stars: 5
      },
      {
        spotId: 4,
        userId: 4,
        review: 'The price was quite steep, but the accommodations were certainly upscale.',
        stars: 4
      },
      {
        spotId: 5,
        userId: 5,
        review: 'The location was convenient and the price was reasonable, but the room was nothing special.',
        stars: 2
      },
      {
        spotId: 5,
        userId: 5,
        review: 'Great value for the price! The room was clean and comfortable.',
        stars: 4
      },
      {
        spotId: 5,
        userId: 5,
        review: 'Big room with a view to the beach. Amazing mainsion. Room was clean and spacious',
        stars: 5
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
