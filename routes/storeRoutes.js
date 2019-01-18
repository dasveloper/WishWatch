const requireLogin = require("../middlewares/requireLogin");
var store_controller = require("../controllers/storeController");
const Product = require("../models/product");

module.exports = app => {
  //Create store
  app.post("/store/create", requireLogin, store_controller.create_store);

  //Update store details
  app.post("/store/update", requireLogin, store_controller.update_store);

  //Fetch all stores
  app.get("/store/fetchAll", requireLogin, store_controller.fetch_all_stores);

  //Fetch store details
  app.get("/store/fetch", requireLogin, store_controller.fetch_store);

  //Verify store domain
  app.post("/store/verifyDomain", store_controller.verify_domain);

  //Fetch all store products
  app.get(
    "/store/fetchProducts",
    requireLogin,
    store_controller.fetch_products
  );

  //Fetch single store product
  app.get("/store/fetchProduct", requireLogin, store_controller.fetch_product);

  //Add multiple offers to store
  app.post("/store/addOffers", requireLogin, store_controller.add_offers);

  //Remove multiple offers to store
  app.post("/store/removeOffers", requireLogin, store_controller.remove_offers);

  //Fetch all store offers
  app.get("/store/fetchOffers", requireLogin, store_controller.fetch_offers);

  //Add multiple products to store
  app.post("/store/addProducts", requireLogin, store_controller.add_products);
};
