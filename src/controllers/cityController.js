const Ciudades = require('../models/City')

const getAllCities = async (req, res) => {
  try {
    const cities = await Ciudades.getCities();
    res.status(201).json(cities);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener las ciudades" });
  }
};

module.exports = { getAllCities };
