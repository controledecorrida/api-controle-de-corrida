const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config({
  path:
    process.env.NODE_ENV == "production"
      ? ".env.production"
      : ".env.development",
});

const app = express();

app.use(cors());
app.use(express.json());

require("./../routes/routes")(app);

module.exports = app;
