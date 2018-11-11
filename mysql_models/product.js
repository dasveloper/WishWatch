const Sequelize = require("sequelize");
const sequelize = require("../services/database");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    sku: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // owner: {
    //   type: Sequelize.INTEGER,
    //   primaryKey: true,
    //   allowNull: false,
    //   references: {
    //     model: "store",
    //     key: "id"
    //   }
    // },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    indexes: [{ fields: ["sku", "storeId"], unique: true }]
  }
);


module.exports = Product;
