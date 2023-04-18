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
      },
      {
        spotId: 6,
        userId: 1,
        review: 'Disappointing stay. The room was dirty and the staff was unhelpful. Would not recommend.',
        stars: 2
      },
      {
        spotId: 6,
        userId: 2,
        review: 'Average hotel. The room was decent but nothing special. Good location though.',
        stars: 3
      },
      {
        spotId: 6,
        userId: 3,
        review: 'Great value for the price! The room was clean and comfortable.',
        stars: 4
      },
      {
        spotId: 7,
        userId: 1,
        review: 'Terrible experience. The room was noisy and uncomfortable, and the staff was rude. Would never stay here again.',
        stars: 1
      },
      {
        spotId: 7,
        userId: 4,
        review: 'Decent hotel for the price. The room was clean and the location was convenient.',
        stars: 3
      },
      {
        spotId: 7,
        userId: 5,
        review: 'Very comfortable stay. The staff was friendly and helpful, and the room was clean and cozy.',
        stars: 5
      },
      {
        spotId: 8,
        userId: 2,
        review: 'Not a bad hotel, but not great either. The room was okay and the staff was friendly enough, but nothing really stood out.',
        stars: 3
      },
      {
        spotId: 8,
        userId: 3,
        review: 'Great hotel with excellent service! The room was clean and comfortable, and the staff went above and beyond to make my stay enjoyable.',
        stars: 5
      },
      {
        spotId: 8,
        userId: 4,
        review: 'Decent location and decent room. Nothing to write home about, but not bad either.',
        stars: 3
      },
      {
        spotId: 9,
        userId: 1,
        review: 'Worst hotel I have ever stayed at. The room was dirty and smelled bad, and the staff was unresponsive to my complaints. Would give 0 stars if possible.',
        stars: 1
      },
      {
        spotId: 9,
        userId: 3,
        review: 'Very good hotel for the price. The room was clean and comfortable, and the staff was friendly and helpful.',
        stars: 4
      },
      {
        spotId: 9,
        userId: 5,
        review: 'Amazing hotel with fantastic amenities! The room was luxurious and the staff was top-notch. Highly recommended.',
        stars: 5
      },
      {
        spotId: 10,
        userId: 1,
        review: 'Awful hotel. The room was dirty and uncomfortable, and the staff was rude. Would never stay here again.',
        stars: 1
      },
      {
        spotId: 10,
        userId: 2,
        review: 'Decent hotel for the price. The room was clean and the location was convenient, but the staff could have been more friendly.',
        stars: 3
      },
      {
        spotId: 10,
        userId: 4,
        review: 'Very comfortable stay. The room was clean and cozy, and the staff was friendly and helpful.',
        stars: 4
      },
      {
        spotId: 11,
        userId: 2,
        review: 'Okay hotel. The room was decent and the staff was friendly, but the location was not great.',
        stars: 3
      },
      {
        spotId: 11,
        userId: 3,
        review: 'Excellent hotel with amazing service! The room was luxurious and the staff went above and beyond to make my stay enjoyable.',
        stars: 5
      },
      {
        spotId: 11,
        userId: 5,
        review: 'Good hotel for the price. The room was clean and comfortable, but the staff could have been more attentive.',
        stars: 3
      },
      {
        spotId: 12,
        userId: 1,
        review: 'The worst hotel experience of my life. The room was dirty and uncomfortable, and the staff was unresponsive to my complaints.',
        stars: 1
      },
      {
        spotId: 12,
        userId: 3,
        review: 'Very good hotel for the price. The room was clean and comfortable, and the staff was friendly and helpful.',
        stars: 4
      },
      {
        spotId: 12,
        userId: 4,
        review: 'Decent location and decent room. Nothing special, but not terrible either.',
        stars: 3
      },
      {
        spotId: 13,
        userId: 1,
        review: 'Great hotel! The room was spacious and comfortable, and the staff was very friendly and accommodating.',
        stars: 5
      },
      {
        spotId: 13,
        userId: 2,
        review: 'Not a bad hotel for the price. The room was clean and the staff was friendly, but nothing exceptional.',
        stars: 3
      },
      {
        spotId: 13,
        userId: 3,
        review: 'Awesome hotel experience! The room was beautiful and the staff was extremely helpful and attentive.',
        stars: 5
      },
      {
        spotId: 14,
        userId: 2,
        review: 'Good value for the price. The room was clean and comfortable, and the staff was friendly and helpful.',
        stars: 4
      },
      {
        spotId: 14,
        userId: 4,
        review: 'Terrible hotel. The room was dirty and uncomfortable, and the staff was rude and unhelpful.',
        stars: 1
      },
      {
        spotId: 14,
        userId: 5,
        review: 'Decent hotel for a quick stay. The room was clean and the staff was friendly, but nothing exceptional.',
        stars: 3
      },
      {
        spotId: 15,
        userId: 1,
        review: 'Excellent hotel experience! The room was spacious and luxurious, and the staff was extremely friendly and helpful.',
        stars: 5
      },
      {
        spotId: 15,
        userId: 3,
        review: 'Good hotel for the price. The room was clean and comfortable, and the staff was friendly and accommodating.',
        stars: 4
      },
      {
        spotId: 15,
        userId: 4,
        review: 'Okay hotel. The room was decent and the staff was friendly, but nothing exceptional.',
        stars: 3
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
