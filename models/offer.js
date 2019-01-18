const Sequelize = require("sequelize");
const sequelize = require("../services/database");

const Offer = sequelize.define(
  "offer",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    offer_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    link: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    product_sku: {
        type: Sequelize.STRING,
        allowNull: false,
      }
  }
  ,
  {
    indexes: [{ fields: ["offer_id", "productId"], unique: true }]
  }
);


module.exports = Offer;
