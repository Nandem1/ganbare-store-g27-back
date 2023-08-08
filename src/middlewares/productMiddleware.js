const jwt = require("jsonwebtoken");

const verifyJwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autenticación no proporcionado." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      console.error(decoded);
      return res
        .status(403)
        .json({ message: "Token de autenticación inválido." });
    }

    if (decoded.userRol !== 1) {
      return res.status(403).json({
        message:
          "Acceso denegado. Solo los administradores pueden crear productos.",
      });
    }
    console.log(decoded)
    next();
  });
};

const validateProductDataMiddleware = (req, res, next) => {
  const {
    category_id,
    productname,
    price,
    stock,
    garantia,
    description,
    image,
  } = req.body;
  if (
    !category_id ||
    !productname ||
    !price ||
    !stock ||
    !garantia ||
    !description ||
    !image
  ) {
    return res.status(400).json({ message: "Datos incompletos del producto." });
  }
  return next();
};

module.exports = {
  verifyJwtMiddleware,
  validateProductDataMiddleware,
};
