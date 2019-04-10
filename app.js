const express = require("express");
const passport = require("passport");
const { User } = require("./sequelize");

let app = express();

app.use(express.static("public"));

app.post("/login", (req, res) => {
  User.findAll({ attributes: ["username", "password"] }).then(result => {
    console.log(result);
    res.send("potato");
  });
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});
