const pool = require("../config/db");

const addFav = async (userId, productId) => {
  const query =
    "INSERT INTO fav (user_id, product_id) VALUES ($1, $2) RETURNING *";
  try {
    const response = await pool.query(query, [userId, productId]);
    return response.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const getFavsByUserId = async (userId) => {
  const query = `
    SELECT p.*
    FROM fav AS f
    JOIN products AS p ON f.product_id = p.product_id
    WHERE f.user_id = $1;
  `;

  try {
    const response = await pool.query(query, [userId]);
    return response.rows;
  } catch (error) {
    throw new Error(error);
  }
};

const removeFav = async (userId, productId) => {
  const query = "DELETE FROM fav WHERE user_id = $1 AND product_id = $2";
  try {
    const response = await pool.query(query, [userId, productId]);
    return response.rows[0];
  } catch (error) {
    console.error("console.log en model fav: ", error)
    throw new Error(error);
  }
};

module.exports = {
  addFav,
  getFavsByUserId,
  removeFav,
};
