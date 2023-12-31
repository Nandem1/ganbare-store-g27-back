const User = require("../models/Users");
const City = require("../models/City");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const newUser = await User.createUser(req.body);
    console.log("usuario nuevo backend: ", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario." });
  }
};

const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;
  try {
    const user = await User.getUserByEmail(userEmail);
    console.log("usuario en controlador: ", user);
    const response = await bcrypt.compare(password, user[0].password);

    if (!user || !response) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const city = await City.getCityById(user[0].city_id);
    console.log(city);
    const token = jwt.sign(
      { userId: user[0].user_id,
        userRol: user[0].profile_id,
        userEmail: user[0].useremail,
        userAddress: user[0].useraddress,
        userCity: city[0].cityname,
        userRut: user[0].userrut,
        userPhone: user[0].userphone
       },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión." });
  }
};

const decodeToken = async (req, res) => {
  console.log("entre a decodificar en back")
  const token = req.body.token;
  console.log("token en body: ",token);
  console.log(req.body);
  try {
    console.log("entre al try");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    const userInfo = {
      userId: decodedToken.userId,
      userRol: decodedToken.userRol,
      userEmail: decodedToken.userEmail,
      userAddress: decodedToken.userAddress,
      userCity: decodedToken.userCity,
      userRut: decodedToken.userRut,
      userPhone: decodedToken.userPhone
    };
    console.log("usuario payload: ", userInfo);
    if (decodeToken){
      console.log("respondoi usuario");
      res.json({userInfo});
    }else{
      res.status(404).json({message: "No existen datos en payload"})
    }

  } catch (error) {
    res.status(500).json({message: "error al decodificar el token"})
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener los usuarios." });
  }
};
const updateUser = async (req, res) => {
  const userId = req.params.id;
  console.log('userId', userId);
  const { userAddress, password, profile_id, city_id, userRut, userPhone, userEmail } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.getUserById(userId);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Actualizar la información del usuario
    const updatedUser = await User.updateUser(userId, {
      userAddress,
      password,
      profile_id,
      city_id,
      userRut,
      userPhone, 
      userEmail
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error al editar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getUsers,
  decodeToken,
  updateUser
};
