const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weatherCondition: { type: String, required: true },
  soilType: { type: String, required: true },
});

const Area = mongoose.model('Area', areaSchema);

module.exports = Area;
