const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);

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
    if(response.useremail){
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
