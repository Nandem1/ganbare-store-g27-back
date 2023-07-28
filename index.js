const express = require("express");
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3000;
const userRoutes = require('./src/routes/userRoutes')

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => res.send("Hello World!"));

//Disponibilizar rutas de usuarios
app.use('/users', userRoutes);
app.listen(port, () => console.log('\x1b[36m', `Server listening on http://localhost:${port}!`));


module.exports = app;