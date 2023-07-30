const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const productMiddleware = require("../middlewares/productMiddleware");

router.post(
  "/newproduct",
  productMiddleware.verifyJwtMiddleware,
  productMiddleware.validateProductDataMiddleware,
  productController.createNewProduct
);
router.get("/allproducts", productController.getAllProducts);

module.exports = router;
