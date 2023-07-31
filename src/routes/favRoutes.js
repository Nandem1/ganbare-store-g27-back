const express = require("express");
const router = express.Router();
const favController = require("../controllers/favController");
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/getFav/:userId', authMiddleware.authMiddleware, favController.getAllFav);
router.post('/addToFav/:userId' , authMiddleware.authMiddleware, favController.addFav);
router.delete('/deleteFav/:userId', authMiddleware.authMiddleware, favController.deleteFav);

module.exports = router;
