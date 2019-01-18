const requireLogin = require("../middlewares/requireLogin");
var user_controller = require("../controllers/userController");

module.exports = app => {
  app.post("/user/addToWishlist", requireLogin, user_controller.add_to_wishlist);

  app.get("/user/fetchWishlist", requireLogin, user_controller.fetch_wishlist);
};
 