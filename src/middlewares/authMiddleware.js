const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido.' });
    }

    req.userId = decoded.userId;
    next();
  });
}

const checkDuplicateUsername = async(req, res, next) => {
  const { userEmail } = req.body;
  try{
    const response = await User.getUserByEmail(userEmail);
    console.log(response);
    console.log(response.userEmail);
    console.log(response.useremail);
    if(response.length > 0){
        return res.status(400).send({ message: "El correo electrónico ya está registrado." });
      }
      next();
  }catch(err){
      res.status(500).send({ message: err.message })
  }
};


module.exports = {
  authMiddleware,
  checkDuplicateUsername
}
