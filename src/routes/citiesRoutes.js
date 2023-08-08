const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

router.get("/allcities", cityController.getAllCities);

module.exports = router;
