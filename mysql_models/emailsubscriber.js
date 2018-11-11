const Sequelize = require("sequelize");
const sequelize = require("../services/database");

const EmailSubscriber = sequelize.define("emailsubscriber", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = EmailSubscriber;