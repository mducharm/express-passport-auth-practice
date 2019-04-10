const express = require("express");
const passport = require("passport");
const Sequelize = require("sequelize");

let app = express();

app.use(express.static("public"));

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.error("Not connected");
  });

app.listen(3000, () => {
  console.log("Listening on 3000");
});
