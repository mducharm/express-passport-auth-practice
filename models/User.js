module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    username: {
      type: type.STRING,
      primaryKey: true
    },
    password: {
      type: type.STRING
    }
  });
};
