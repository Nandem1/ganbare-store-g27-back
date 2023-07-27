const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;
const usuarios = require('./src/routes/usuarios');
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => res.send("Hello World!"));
app.use('/usuarios', usuarios);
app.listen(port, () => console.log('\x1b[36m', `Server listening on http://localhost:${port}!`));


module.exports = app;