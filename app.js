require("dotenv").config();
const express = require("express");

// Create an Express application
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", function (req, res) {
  res.status(200).send({ msg: "Welcome  new API" });
});

// jobDaily.start();

const routes = require("./src/features/routes");

app.use(routes);
