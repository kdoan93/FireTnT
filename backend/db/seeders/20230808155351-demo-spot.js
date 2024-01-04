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
        city: "Breckenridge",
        state: "Colorado",
        country: "USA",
        lat: -40.7645,
        lng: -2.4730,
        name: "Three Sisters Lookout",
        description: "A FOURTH place where web developers are created",
        price: 724.00
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
        description: "Stone columns rise from rocky shores at this Topton home on Lake Nantahala. Decks with living and dining areas, a barbecue, and a hot tub look out to lake and mountains, and steps lead to the private dock. Timber and stone lend rustic charm in generous rooms; velvet and leather take inspiration from classic hunting lodges. Hiking in Nantahala National Forest is just beyond the property.",
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
        description: "Nestled between an abundance of leafy trees, this North Carolina escape boasts complete privacy. The 7,500-square-foot home sits at the edge of a peninsula on Fontana Lake with rippling waters below and soaring mountain peaks above. Grab a bottle of wine to sip on the covered porch — perhaps while soaking in the salt-water hot tub. Billiards and a cinema room keep the entertainment going at home.",
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
        description: "Perfect for larger groups, this breezy island home in the Isle of Palms community has accommodations for 12 and plenty of scenic space for everyone to find privacy when needed. From the rooftop balcony, you’ll enjoy sweeping ocean views. For a closer look, follow the beach pathway to the shore for a swim. Later, get some rest in a poolside lounge chair or lay back in the hot tub.",
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
        description: "Midcentury modern 2bed/2bath stilt home with spectacular views above Sunset Strip (2 blocks up from Hollywood + Fairfax). Only blocks from the action, but very private and quiet. Recent renovations from roof to foundation, heat/AC system, 1 Giga/sec wifi, wired in + out with 11 speakers, movie projector + two 4k TVs (free Netflix, HBOMax and AppleTV+), 2-car parking with level 2 electric charger.",
        price: 345.00
      },
      {
        ownerId: 2,
        address: "93 Fresh Street",
        city: "Beverly Hills",
        state: "California",
        country: "USA",
        lat: 40.7245,
        lng: 12.4730,
        name: "Chateau de Banks",
        description: "Just off North Beverly Hills Drive, this classical French style estate is in prime location for enjoying all this iconic area has to offer. With an incredible amount of indoor and outdoor space, it's perfect for large scale entertaining, extended family vacations, and maybe even a romantic wedding ceremony.",
        price: 16264.00
      },
      {
        ownerId: 3,
        address: "4 Lake Lane",
        city: "Zephyr Cove",
        state: "Nevada",
        country: "USA",
        lat: 1.7645,
        lng: 27.4730,
        name: "Million Dollar Views",
        description: "Sierra Sunset Estate enjoys the most ideal location a lakefront home on Lake Tahoe can boast. Less than 10 minutes to Stateline, Nevada, the opportunities for entertainment are endless. If gaming brings you joy, pop into Harrah's Lake Tahoe, Montbleu Resort or Hard Rock Hotel and Casino for an array of gambling options. These establishments also offer a variety of venues for concerts, shows, spa delights and shopping. World class skiing is just up the hill, literally, with Heavenly Ski Resort the proud mountain of 4,800 skiable acres (the most in Lake Tahoe).",
        price: 28000.00
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
        description: "Sonoma Coast is a Frank Lloyd Wright inspired modern California Ranch w/ subtle Prairie & International architectural design; perched on a promontory overlooking cove w/ jaw dropping ocean views and mesmerizing - audible crashing white water waves. Complete with spa, BBQ, dry/wet sauna, chefs kitchen, lux bedding and linens, Le Creuset crockery, Mauviel stainless steel cookware, Viking appliances, Wolf small kitchen appliances, Jura Espresso Machine with frother, WIFI, streaming Roku & Alexa.",
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
