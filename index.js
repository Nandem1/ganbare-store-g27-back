const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log('\x1b[36m', `Server listening on http://localhost:${port}!`));