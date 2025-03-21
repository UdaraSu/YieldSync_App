const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Area = require('./models/Area');

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await Area.deleteMany();

    const areas = [
      {
        name: 'Area 1',
        weatherCondition: 'Sunny',
        soilType: 'Clay',
      },
      {
        name: 'Area 2',
        weatherCondition: 'Rainy',
        soilType: 'Sandy',
      },
    ];

    await Area.insertMany(areas);
    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

seedData();
