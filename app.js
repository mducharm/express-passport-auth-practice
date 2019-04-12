const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./sequelize");
const bCrypt = require("bcrypt-nodejs");

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: "potatoes", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

passport.use(
  "local-signup",
  new LocalStrategy(function(req, username, password, done) {
    let generateHash = password => {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
    User.findOne({
      where: {
        username: username
      }
    }).then(user => {
      if (user) {
        return done(null, false, { message: "Username already taken." });
      } else {
        let hashedUserPassword = generateHash(password);
        let data = {
          username: username,
          password: hashedUserPassword
        };
        User.create(data).then((newUser, created) => {
          if (!newUser) {
            return done(null, false);
          }
          if (newUser) {
            return done(null, newUser);
          }
        });
      }
    });
  })
);

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
