const Sequelize = require("sequelize");
const sequelize = require("../services/database");
const Product = require("./product");
const User = require("./user");

const UserProduct = sequelize.define("userproduct", {

});


module.exports = UserProduct;
