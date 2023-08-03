const pool = require("../config/db");

const getCities = async () => {
  try {
    const result = await pool.query("SELECT * FROM cities");
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCities
}