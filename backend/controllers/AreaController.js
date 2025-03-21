const Area = require('../models/Area');

// @desc Get all areas
// @route GET /api/areas
const getAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get specific area details
// @route GET /api/areas/:id
const getAreaById = async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAreas, getAreaById };
