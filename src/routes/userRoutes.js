const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/',userController.getUsers);
router.post('/register', authMiddleware.checkDuplicateUsername,userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/decodeToken', userController.decodeToken);
router.get('/protected', authMiddleware.authMiddleware, (req, res) => {
  res.json({ message: 'Ruta protegida, acceso permitido.' });
});

module.exports = router;
