const pool = require('../config/db');

const createUser = async(user) => {
  const query = 'INSERT INTO users (useremail, useraddress, password, profile_id, city_id, userrut, userphone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING (useremail, useraddress, password, profile_id, city_id, userrut, userphone)';
  const { useremail, useraddress, password, profile_id, city_id, userrut, userphone} = user;
  try {
    const response = await pool.query(query, [useremail, useraddress, password, profile_id, city_id, userrut, userphone]);
    return response.rows;
  } catch (error) {
    throw new Error(error);
  }
}

const getUserByEmail = async(credentials) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  try {
    const response = await pool.query(query, [credentials]);
    return response.rows;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports ={
  createUser,
  getUserByEmail
};
