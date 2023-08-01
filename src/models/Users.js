const pool = require('../config/db');
const bcrypt = require('bcrypt');

const createUser = async(user) => {
  const { userEmail, userAddress, password, profile_id, city_id, userRut, userPhone} = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (useremail, useraddress, password, profile_id, city_id, userrut, userphone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING userEmail, userAddress, profile_id, city_id, userRut, userPhone';
  try {
    const response = await pool.query(query, [userEmail, userAddress, hashedPassword, profile_id, city_id, userRut, userPhone]);
    return response.rows;
  } catch (error) {
    throw new Error(error);
  }
}

const getUserByEmail = async(credentials) => {
  const query = 'SELECT * FROM users WHERE useremail = $1';
  try {
    const response = await pool.query(query, [credentials]);
    return response.rows;
  } catch (error) {
    throw new Error(error);
  }
}
const getUsers = async () => {
  const query = 'SELECT * FROM users';
  try {
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.log("entre al error");
    console.log(error);
    throw error;
  }
}
module.exports ={
  createUser,
  getUserByEmail,
  getUsers
};
