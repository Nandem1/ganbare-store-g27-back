const Products = require("../models/Products");

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.getProducts();
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

const getOneProduct = async(req, res) => {
  const { productId } = req.body;
  try {
    const product = await Products.getProductById(productId);
    if (product){res.status(200).json(product)}
    else{res.status(204).json({message: "No existe el producto"})}
  } catch (error) {
    res.status(500).json({message: "Error interno del servidor al obtener el producto"})
  }
}

const createNewProduct = async (req, res) => {
  try {
    const {
      category_id,
      productname,
      price,
      stock,
      garantia,
      description,
      image,
    } = req.body;
    const product = await Products.createProduct(
      category_id,
      productname,
      price,
      stock,
      garantia,
      description,
      image
    );
    res.status(201).json({category_id,
      productname,
      price,
      stock,
      garantia,
      description,
      image});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar un nuevo producto" });
  }
};

module.exports = {
  getAllProducts,
  createNewProduct,
  getOneProduct
};
