'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Spots'
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '122 Main st',
        city: 'Dallas',
        state: 'Texas',
        country: 'United States',
        lat: 72.454,
        lng: 120.223,
        name: 'Country Oak',
        description: 'Cozy mainsion with big ancre',
        price: 10000
      },
      {
        ownerId: 1,
        address: '456 Elm St',
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States',
        lat: 41.881,
        lng: -87.627,
        name: 'Lakefront Retreat',
        description: 'Charming cottage with stunning views of Lake Michigan',
        price: 5000
      },
      {
        ownerId: 1,
        address: '789 Maple Ave',
        city: 'San Francisco',
        state: 'California',
        country: 'United States',
        lat: 37.774,
        lng: -122.419,
        name: 'City Oasis',
        description: 'Modern apartment with rooftop garden in the heart of the city',
        price: 8000
      },
      {
        ownerId: 2,
        address: '321 Oak St',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 40.712,
        lng: -74.006,
        name: 'Central Park Views',
        description: 'Luxurious penthouse with panoramic views of Central Park',
        price: 15000
      },
      {
        ownerId: 2,
        address: '567 Birch Ln',
        city: 'Austin',
        state: 'Texas',
        country: 'United States',
        lat: 30.267,
        lng: -97.743,
        name: 'Hill Country Hideaway',
        description: 'Secluded cabin nestled in the rolling hills of Texas',
        price: 6000
      },
      {
        ownerId: 2,
        address: '890 Pine St',
        city: 'Miami',
        state: 'Florida',
        country: 'United States',
        lat: 25.761,
        lng: -80.191,
        name: 'Oceanfront Villa',
        description: 'Elegant villa with direct access to the beach',
        price: 12000
      },
      {
        ownerId: 3,
        address: '432 Cedar Dr',
        city: 'Seattle',
        state: 'Washington',
        country: 'United States',
        lat: 47.606,
        lng: -122.332,
        name: 'Modern Loft',
        description: 'Spacious loft in a trendy neighborhood with stunning city views',
        price: 9000
      },
      {
        ownerId: 3,
        address: '765 Walnut Ave',
        city: 'Denver',
        state: 'Colorado',
        country: 'United States',
        lat: 39.739,
        lng: -104.990,
        name: 'Mountain Retreat',
        description: 'Rustic cabin with breathtaking views of the Rockies',
        price: 7000
      },
      {
        ownerId: 3,
        address: '987 Cherry St',
        city: 'Portland',
        state: 'Oregon',
        country: 'United States',
        lat: 45.523,
        lng: -122.676,
        name: 'Hipster Haven',
        description: 'Quirky studio in a bohemian neighborhood with easy access to city attractions',
        price: 4000
      },
      {
        ownerId: 4,
        address: '654 Oakwood Blvd',
        city: 'Nashville',
        state: 'Tennessee',
        country: 'United States',
        lat: 36.162,
        lng: -86.781,
        name: 'Music City Mansion',
        description: 'Luxury estate with a recording studio and private pool',
        price: 20000
      },
      {
        ownerId: 4,
        address: '321 Willow Rd',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States',
        lat: 36.169,
        lng: -115.140,
        name: 'Desert Oasis',
        description: 'Spectacular villa with a pool and hot tub in a desert oasis',
        price: 15000
      },
      {
        ownerId: 4,
        address: '1231 Vine St',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States',
        lat: 32.776,
        lng: -79.931,
        name: 'Southern Charm',
        description: 'Historic home with a wraparound porch in the heart of Charleston',
        price: 8000
      },
      {
        ownerId: 5,
        address: '4561 Oak St',
        city: 'Aspen',
        state: 'Colorado',
        country: 'United States',
        lat: 39.191,
        lng: -106.817,
        name: 'Ski Chalet',
        description: 'Cozy chalet with ski-in/ski-out access and mountain views',
        price: 10000
      },
      {
        ownerId: 5,
        address: '7891 Maple Ave',
        city: 'San Diego',
        state: 'California',
        country: 'United States',
        lat: 32.715,
        lng: -117.161,
        name: 'Beachfront Bungalow',
        description: 'Charming bungalow steps away from the beach',
        price: 6000
      },
      {
        ownerId: 5,
        address: '1010 Cherry Blossom Ln',
        city: 'Honolulu',
        state: 'Hawaii',
        country: 'United States',
        lat: 21.306,
        lng: -157.858,
        name: 'Tropical Paradise',
        description: 'Stunning villa with a private pool and lush tropical gardens',
        price: 20000
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
    options.tableName = 'Spots'
    return queryInterface.bulkDelete(options, {})
  }
};
