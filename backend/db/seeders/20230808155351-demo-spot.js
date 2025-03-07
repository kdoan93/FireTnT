'use strict';

const { Spot } = require('../models');

let options = {};
//  Defines your schema through the options object
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;



module.exports = {
  async up (queryInterface, Sequelize) {

    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "1 Disney Lane",
        city: "Greenville",
        state: "South Carolina",
        country: "USA",
        lat: 37.7645,
        lng: -122.4730,
        name: "Cozy Treehouse",
        description: "A place where web developers are created",
        price: 273.00
      },
      {
        ownerId: 2,
        address: "2 Universal Lane",
        city: "Blue Ridge",
        state: "Georgia",
        country: "USA",
        lat: 40.7645,
        lng: 12.4730,
        name: "New LUXE Chalet",
        description: "Another place where web developers are created",
        price: 1052.00
      },
      {
        ownerId: 3,
        address: "3 Main Street",
        city: "Bolton",
        state: "New York",
        country: "USA",
        lat: -40.7645,
        lng: -2.4730,
        name: "'Highlands Castle' overlooking Lake George",
        description: "A third place where web developers are created",
        price: 2290.00
      },
      {
        ownerId: 4,
        address: "4 Main Street",
        city: "Clyde",
        state: "North Carolina",
        country: "USA",
        lat: -40.7645,
        lng: -2.4730,
        name: "Ultra Luxe Dome + Hot Tub + Premium Mountain View",
        description: "A FOURTH place where web developers are created",
        price: 324.00
      },
      {
        ownerId: 1,
        address: "350 Mountain Road",
        city: "Macon",
        state: "North Carolina",
        country: "USA",
        lat: -41.7645,
        lng: -22.4730,
        name: "Forge Lake Lodge",
        description: "Stone columns rise from rocky shores at this Topton home on Lake Nantahala. Decks with living and dining areas, a barbecue, and a hot tub look out to lake and mountains, and steps lead to the private dock.",
        price: 1660.00
      },
      {
        ownerId: 2,
        address: "21 Watershed Way",
        city: "Bryson City",
        state: "North Carolina",
        country: "USA",
        lat: -40.7622,
        lng: -2.4220,
        name: "The Watershed Cabin",
        description: "Nestled between an abundance of leafy trees, this North Carolina escape boasts complete privacy. The 7,500-square-foot home sits at the edge of a peninsula on Fontana Lake with rippling waters below and soaring mountain peaks above.",
        price: 3250.00
      },
      {
        ownerId: 3,
        address: "320 Shore Way",
        city: "Isle of Palms",
        state: "South Carolina",
        country: "USA",
        lat: -40.2245,
        lng: -2.2430,
        name: "Shore Beats Work",
        description: "Perfect for larger groups, this breezy island home in the Isle of Palms community has accommodations for 12 and plenty of scenic space for everyone to find privacy when needed.",
        price: 1470.00
      },
      {
        ownerId: 4,
        address: "119 W 42nd Street",
        city: "Manhattan",
        state: "New York",
        country: "USA",
        lat: -50.7645,
        lng: 21.4730,
        name: "Skyline Views",
        description: "Dont look further  my amazing apartment has a stunning Manhattan skyline . Quick access to Hell's Kitchen, Hudson Yards, Time Square, Javits Center, Bryant Park, The Vessel and more",
        price: 318.00
      },
      {
        ownerId: 1,
        address: "1 Hollywood Drive",
        city: "Los Angeles",
        state: "California",
        country: "USA",
        lat: 42.7645,
        lng: 11.4730,
        name: "Architectural Wonder Above Sunset-WeHo w/ Big View",
        description: "Midcentury modern 2bed/2bath stilt home with spectacular views above Sunset Strip (2 blocks up from Hollywood + Fairfax). Only blocks from the action, but very private and quiet.",
        price: 345.00
      },
      {
        ownerId: 2,
        address: "93 Fresh Street",
        city: "Moss Beach",
        state: "California",
        country: "USA",
        lat: 40.7245,
        lng: 12.4730,
        name: "Walk to the Beach from this Ocean Front Home",
        description: "Your beachfront escape awaits you. Come immerse yourself in the serenity of this Pacific Ocean retreat gracefully set in a secluded beach just 25 mins south of San Francisco.",
        price: 1000.00
      },
      {
        ownerId: 3,
        address: "4 Lake Lane",
        city: "Mooresville",
        state: "North Carolina",
        country: "USA",
        lat: 1.7645,
        lng: 27.4730,
        name: "Sterling on Strawpocket",
        description: "Sterling on Strawpocket can only be described as offering timeless beauty coupled with breathtaking sunset views over stunning Lake Norman.",
        price: 1200.00
      },
      {
        ownerId: 4,
        address: "360 Coast View Drive",
        city: "Jenner",
        state: "California",
        country: "USA",
        lat: 62.7645,
        lng: 2.4730,
        name: "Sonoma Coast•Arch•Estate•Dramatic Ocean VUs",
        description: "Sonoma Coast is a Frank Lloyd Wright inspired modern California Ranch w/ subtle Prairie & International architectural design; perched on a promontory overlooking cove w/ jaw dropping ocean views and mesmerizing - audible crashing white water waves.",
        price: 1500.00
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {});
  }
};
