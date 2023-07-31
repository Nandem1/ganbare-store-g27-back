const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/getCart/:userId', authMiddleware.authMiddleware, cartController.getCart);
router.post('/addToCart/:userId' , authMiddleware.authMiddleware, cartController.addProductToCart);
router.delete('/deleteProduct/:userId', authMiddleware.authMiddleware, cartController.deleteProductFromCart);

module.exports = router;

