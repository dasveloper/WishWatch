const validate = require("../helpers/validation");
const UserProduct = require("../models/userProduct");
const Product = require("../models/product");
const Store = require("../models/store");
const User = require("../models/user");

exports.add_to_wishlist = function(req, res) {
  const { product } = req.body;
  const { id } = req.user;

  UserProduct.create({
    userId: id,
    productId: product.id
  })
    .then(userproduct => {
      return res.status(200).json({
        success: true,
        message: "Product added to wishlist",
        userproduct: userproduct
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: "Something went wrong, please try again"
      });
    });
};

exports.fetch_wishlist = function(req, res) {
  const { id } = req.user;

  User.findOne({
    where: {
      id: id
    },
    include: [
      {
        model: Product,

        include: [
          {
            model: Store,
            required: true
          }
        ]
      }
    ]
  })
    .then(userproduct => {
      return res.status(200).json({
        success: true,
        message: "Product added to wishlist",
        wishlist: userproduct
      });
    })
    .catch(err => {
      console.log(err);
    });
};
