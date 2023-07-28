const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();



const registerUser = async (req, res) => {
    try {
        const newUser = await User.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario.' });
    }
}

const loginUser = async (req, res) => {
    const { userEmail, password } = req.body;
    console.log(userEmail, password);
    try {

        const user = await User.getUserByEmail(userEmail);
        const response = await bcrypt.compare(password, user[0].password);

        if (!user || !(response)) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const token = jwt.sign({ userId: user[0].user_id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión.' });
    }
}


module.exports = {
    registerUser,
    loginUser
};
// exports.getUsers = async (req, res) => {
    // res.json({ data: 'hola mundo' });
// };
//
