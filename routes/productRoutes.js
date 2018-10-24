const keys = require("../config/keys.js");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
var validator = require("validator");
const fileUpload = require("express-fileupload");
var fs = require("fs");

require("../models/Product");

const Product = mongoose.model("product");

function validate(value, type) {
  switch (type) {
    case "string":
      return value && !validator.isEmpty(value, { ignore_whitespace: true });
    default:
      return value && validator.isEmpty(value, { ignore_whitespace: true });
  }
  return value == null || value.length === 0;
}
module.exports = app => {
  app.use(fileUpload());

  app.post("/product/addProduct", requireLogin, (req, res) => {
    let products = req.files.file.data;
    try {
      products = JSON.parse(products);
    } catch (e) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid JSON product feed" });
    }
    let accepted = [];
    let rejected = [];

    products.forEach(function(product) {
      if (validate(product.productId, "string")) accepted.push(product);
      else rejected.push(product);
    });

    Product.insertMany(products, function(err, docs) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong, please try again"
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Company successfully created",
          accepted: { count: accepted.length, list: accepted },
          rejected: { count: rejected.length, rejected: rejected },

          affiliate: docs
        });
      }
    });
  });
};
