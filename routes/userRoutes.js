const keys = require("../config/keys.js");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

require("../models/User");
const User = mongoose.model("users");

require("../models/Product");
const Product = mongoose.model("product");

module.exports = app => {
  //Create store

  //Update store profile
  app.post("/user/addToWishlist", requireLogin, async (req, res) => {
    const productId = req.body.productId;

    req.user.watching.push(productId);

    req.user.save(function(err, docs) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong, please try again"
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Product added to watchlist",
          affiliate: req.user.watching
        });
      }
    });
  });
  //Update store profile
  app.get("/user/fetchWatchlist", requireLogin, async (req, res) => {
    const watchingIds = req.user.watching;
    Product.find(
      {
        _id: {
          $in: watchingIds
        }
      },
      function(err, docs) {
        console.log(docs);
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again"
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "Product added to watchlist",
            watchlist: docs
          });
        }
      }
    );
  });
};
