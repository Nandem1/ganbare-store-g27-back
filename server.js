const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

let corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Si esta recibiendo la petición, bienvenido al backend de Ganbare Store" });
});

const PORT = 3500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;