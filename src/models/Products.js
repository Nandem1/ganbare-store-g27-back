const pool = require("../config/db");

const createProduct = async (
  category_id,
  productname,
  price,
  stock,
  garantia,
  description,
  image
) => {
  const query =
    "INSERT INTO products (category_id, productname, price, stock, garantia, description, image) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  const values = [
    category_id,
    productname,
    price,
    stock,
    garantia,
    description,
    image,
  ];
  try {
    const response = await pool.query(query, values);
    return response.rows;
  } catch (error) {
    throw new Error(error);
  }
};

const getProducts = async () => {
  const query = "SELECT * FROM products";
  try {
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    throw new Error(error);
  }
};

const getProductById = async (id) => {
  const query = "SELECT * FROM products WHERE product_id = $1";
  try {
    const response = await pool.query(query, [id]);
    return response.rows;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProductById = async (id) => {
  const query = `DELETE * from products where product_id=$1`;
  try {
    const response = await pool.query(query, [id]);
    return response.rows;
  } catch (error) {
    throw new Error(error);
  }
};

const updateProductById = async (product) => {
  const query = `UPDATE products SET category_id = $1, productname = $2, price = $3, stock = $4, garantia = $5, description = $6, image = $7 WHERE product_id = $8`;
  try {
    const response = await pool.query(query, [
      category_id,
      productname,
      price,
      stock,
      garantia,
      description,
      image,
    ]);
    return response.rows;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById
};
