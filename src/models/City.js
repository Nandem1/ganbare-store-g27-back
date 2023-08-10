const pool = require("../config/db");

const getCities = async () => {
  try {
    const result = await pool.query("SELECT * FROM cities");
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};

const getCityById = async(id) => {
  const query = "SELECT cityname FROM cities WHERE city_id = $1";
  try {
    const response = await pool.query(query, [id]);
    return response.rows;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getCities,
  getCityById
}