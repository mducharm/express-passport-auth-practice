const express = require("express");
const passport = require("passport");
const { User } = require("./sequelize");

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.post("/signup", (req, res) => {
  console.log(req.body);

  User.findOrCreate({
    where: {
      username: req.body.username
    },
    defaults: { username: req.body.username, password: req.body.password }
  }).then(([user, created]) => {
    let credentials = user.get({ plain: true });
    // console.log(credentials.username);
    // console.log(credentials.password);

    if (!created) {
      res.send("Sorry, username taken");
    } else {
      res.send(`Account created with username of ${credentials.username}`);
    }
  });

  //   User.findOne().then(user => {
  //       if (user) {
  //           res.send(404)
  //       } else {
  //           User.create()
  //       }
  //   });
});

app.post("/login", (req, res) => {
  //   console.log(req.body);
  //   res.send("Logged in?");
  User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then(user => {
    if (user) {
      res.send("Logged in!");
    } else {
      res.send("Not a valid login");
    }
  });
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});
