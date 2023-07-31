const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3000;
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require('./src/routes/cartRoutes');
const favRoutes = require('./src/routes/favRoutes');
const { loggingMiddleware, errorHandlerMiddleware } = require("./src/middlewares/statusMiddleware.js");
const compression = require("compression");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(loggingMiddleware);
app.use(errorHandlerMiddleware);
app.get("/", (req, res) => res.send("Hello World!"));

//Disponibilizar rutas de usuarios
app.use("/users", userRoutes);
//Disponibilizar rutas de productos
app.use("/products", productRoutes);
//Disponibilizar rutas de carrito
app.use("/cart", cartRoutes);
//Disponibilizar rutas de favoritos
app.use("/fav", favRoutes);
app.listen(port, () =>
  console.log("\x1b[36m", `Server listening on http://localhost:${port}!`)
);

module.exports = app;
