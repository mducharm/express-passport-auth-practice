const Sequelize = require("sequelize");
const UserModel = require("./models/User");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite"
});

//   sequelize
//     .authenticate()
//     .then(() => {
//       console.log("Connected");
//     })
//     .catch(() => {
//       console.error("Not connected");
//     });

const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log("DB and tables created!");
});

module.exports = {
  User
};
