/** @format */

// importing 3rd party package
const express = require("express");
const app = express();

const PORT = 4000;
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Server started in ${PORT} port`));
