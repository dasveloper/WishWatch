const keys = require("../config/keys.js");
const requireLogin = require("../middlewares/requireLogin");


const UserProduct = require("../mysql_models/userProduct");
const Product = require("../mysql_models/product");
const Store = require("../mysql_models/store");
const User = require("../mysql_models/user");

module.exports = app => {
  //Create store

  //Update store profile
  app.post("/user/addToWishlist", requireLogin, async (req, res) => {
    const { id } = req.body.product;

    UserProduct.create({
      userId: req.user.id,
      productId: id
    })
      .then(userproduct => {
        return res.status(200).json({
          success: true,
          message: "Product added to watchlist",
          userproduct: userproduct
        });
      })
      .catch(err => {
        return res.status(400).json({
          success: false,
          message: "Something went wrong, please try again"
        });
      });
  });
  //Update store profile
  app.get("/user/fetchWatchlist", requireLogin, async (req, res) => {
  
    User.findOne({
      where: {
        id: req.user.id
      },
      include: [
        {
          model: Product,
     
          include: [
            {
              model: Store,
              required: false
            }
          ]
        }
      ]

      // attributes: ["id"] //in quotes specify what columns you want, otherwise you will pull them all
      // Otherwise remove attributes above this line to import everything.
    })
      .then(userproduct => {
        return res.status(200).json({
          success: true,
          message: "Product added to watchlist",
          watchlist: userproduct
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};
