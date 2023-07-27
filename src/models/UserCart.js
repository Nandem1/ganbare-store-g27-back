const pool = require('../config/db');

const addToCart = async (userId, productId, cantidad) => {
  const query = 'INSERT INTO userCart (user_id, product_id, cantidad) VALUES ($1, $2, $3) RETURNING *';
    try {
        const response = await pool.query(query, [userId, productId, cantidad]);
        return response.rows[0];
    } catch (error) {
        throw new Error(error);
    }
}

const getCartByUserId = async (userId) => {
  const query = 'SELECT * FROM userCart WHERE user_id = $1';
    try {
        const response = await pool.query(query, [userId]);
        return response.rows;
    } catch (error) {
        throw new Error(error);
    }
}

const removeFromCart = async (userId, productId) => {
    const query = 'DELETE FROM userCart WHERE user_id = $1 AND product_id = $2';
    try {
        const response = await pool.query(query, [userId, productId]);
        return response.rows[0];
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    addToCart,
    getCartByUserId,
    removeFromCart
};
