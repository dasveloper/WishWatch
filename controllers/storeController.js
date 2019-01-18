const Store = require("../models/store");

const validate = require("../helpers/validation");
const DNShelper = require("../helpers/DNShelper");

const requireLogin = require("../middlewares/requireLogin");
const verifyStoreOwner = require("../middlewares/verifyStoreOwner");

var validator = require("validator");
const Product = require("../models/product");
const Offer = require("../models/offer");

const imageHelper = require("../helpers/imageHelper");
function upsertOffer(newOffer, storeId) {
  return Product.findOne({
    where: { sku: newOffer.product_sku, storeId: storeId }
  }).then(function(product) {
    console.log("in3", product);

    if (product) {
      console.log("in1");

      // Product found, add offer
      return Offer.findOne({
        where: { offer_id: newOffer.offer_id, productId: product.id }
      })
        .then(function(offer) {
          console.log("in2",offer);

          if (offer) {
            // update
            return offer.update({ ...newOffer });
          } else {
            // insert
            return Offer.create({ ...newOffer, productId: product.id });
          }
        })
        .catch(err => console.log(err));
    } else {
      // Product not found
      return false;
    }
  });
}
function upsertProduct(values, condition) {
  return Product.findOne({ where: condition }).then(function(obj) {
    if (obj) {
      // update
      return obj.update(values);
    } else {
      // insert
      return Product.create(values);
    }
  });
}

exports.update_store = function(req, res) {
  const validationErrors = [];
  const { name, website, phone, email } = req.body;

  const storeId = req.body.storeId;
  if (!storeId) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again."
    });
  }

  validate(name, "string", "Please enter a valid store name", validationErrors);
  validate(
    website,
    "url",
    "Please provide a valid url prefixed with https:// or http://",
    validationErrors
  );
  validate(
    phone,
    "string",
    "Please provide a valid phone number",
    validationErrors
  );
  validate(
    email,
    "email",
    "Please provide a valid email address",
    validationErrors
  );
  if (validationErrors.length) {
    return res.status(200).json({
      success: false,
      message: "Invalid form submission",
      errors: validationErrors
    });
  }
  Store.findByPk(storeId)
    .then(store => {
      if (!store) {
        return res.status(400).json({
          success: false,
          message: "Could not find the requested store"
        });
      }
      store.email = email;
      store.phone = phone;
      store.name = name;
      store.website = website;
      store.save();
    })
    .then(result => {
      return res.status(200).json({
        success: true,
        message: "Profile successfully updated"
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: "Could not update store profile."
      });
    });
};
exports.fetch_store = function(req, res) {
  var storeId = req.query.storeId;
  Store.findByPk(storeId)
    .then(store => {
      return res.status(200).json({
        success: true,
        message: "Store details successfully found",
        store: store
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: "Could not find the requested store"
      });
    });
};
exports.fetch_all_stores = function(req, res) {
  var userId = req.query.userId;
  Store.findAll({ where: { owner: userId } })
    .then(stores => {
      return res.status(200).json({
        success: true,
        message: "Stores successfully found",
        stores: stores
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: "No stores found"
      });
    });
};
exports.create_store = function(req, res) {
  const validationErrors = [];
  const { name, website, phone, email } = req.body;
  validate(name, "string", "Please enter a valid store name", validationErrors);
  validate(
    website,
    "url",
    "Please provide a valid url prefixed with https:// or http://",
    validationErrors
  );
  validate(
    phone,
    "string",
    "Please provide a valid phone number",
    validationErrors
  );
  validate(
    email,
    "email",
    "Please provide a valid email address",
    validationErrors
  );
  if (validationErrors.length) {
    return res.status(200).json({
      success: false,
      message: "Invalid form submission",
      errors: validationErrors
    });
  }
  Store.create({
    name: name,
    website: website,
    email,
    phone,
    owner: req.user.id
  })
    .then(store => {
      return res.status(200).json({
        success: true,
        message: "Store successfully created",
        store: store.dataValues
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: "Something went wrong, please try again"
      });
    });
};
exports.fetch_products = function(req, res) {
  const storeId = req.query.storeId;
  Product.findAll({ where: { storeId: storeId } })
    .then(products => {
      return res.status(200).json({
        success: true,
        message: "Products successfully found",
        products: products
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: "Could not find the requested store's products"
      });
    });
};
exports.fetch_offers = function(req, res) {
  const storeId = req.query.storeId;
  Product.findAll({ where: { storeId: storeId },
    include: [
      {
        model: Offer,
        as: "Offers",
        attributes: [['text','Offer'], ['link', 'Link'], ['createdAt', 'Created'], ['updatedAt', 'Updated'], 'product_sku']
      }
    ]
  })
  .then(result => {
  // console.log(result);
    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      offers: result
    });
  })
  .catch(err => {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: err
    });
  });
};

exports.remove_offers = async function(req,res){
  let offers = req.body.offer;

  Offers.destroy({ where: { id: offers }})

}
exports.add_offers = async function(req, res) {
  var storeId = req.body.storeId;
  let offers = req.files.file.data;
  try {
    offers = JSON.parse(offers);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid JSON offer feed" });
  }
  let accepted = [];
  let rejected = [];
  for (const offer of offers) {
    const validationErrors = [];
    const { text, link } = offer;
    validate(text, "string", "Offer text is invalid", validationErrors);
    validate(link, "url", "Offer link is invalid", validationErrors);
    //offer.storeId = storeId;

    if (validationErrors.length) {
      rejected.push(offer);
      continue;
    }

    accepted.push(offer);
  }

  for (const offer of accepted) {
    upsertOffer(offer, storeId)
      .then(function(result) {
        //res.status(200).send({ success: true });
      })
      .catch(err => {
        const index = accepted.indexOf(offer);
        accepted.splice(offer, 1);
        rejected.push(offer);
      });
  }
  return res.status(200).json({
    success: true,
    message: "Offers successfully added",
    accepted: { count: accepted.length, list: accepted },
    rejected: { count: rejected.length, rejected: rejected }
  });
};

exports.add_products = async function(req, res) {
  var storeId = req.body.storeId;
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
  for (const product of products) {
    const validationErrors = [];
    const { sku, image_url } = product;
    validate(sku, "string", "SKU is invalid", validationErrors);
    validate(image_url, "url", "Image URL is invalid", validationErrors);
    product.storeId = storeId;
    if (validationErrors.length) {
      rejected.push(product);
      continue;
    }
    try {
      let result = await imageHelper.saveImage(
        product.image_url,
        `123/${product.sku}`
      );
      product.image_url = result.Location;
    } catch (err) {
      rejected.push(product);
    }

    accepted.push(product);
  }

  for (const product of accepted) {
    upsertProduct(
      { ...product },
      { sku: product.sku, storeId: product.storeId }
    )
      .then(function(result) {
       // console.log(result);

        //res.status(200).send({ success: true });
      })
      .catch(err => {
        console.log(err);
        const index = accepted.indexOf(product);
        accepted.splice(product, 1);
        rejected.push(product);
      });
  }
  Store.findByPk(storeId)
    .then(store => {
      store.updateAttributes({ syncedAt: sequelize.fn("NOW") });
      store.prodListUpdated = sequelize.fn("NOW");
      store.increment("prodListVersion");
      store.save();
    })
    .then(result => {
      console.log("Updated prod list version");
    })
    .catch(err => {
      console.log("Could not update prod list version");
    });
  return res.status(200).json({
    success: true,
    message: "Products successfully added",
    accepted: { count: accepted.length, list: accepted },
    rejected: { count: rejected.length, rejected: rejected }
  });

};
exports.fetch_product = function(req, res) {
  const { storeId, productId } = req.query;
  Product.findOne({ where: { storeId: storeId, sku: productId } })
    .then(product => {
      return res.status(200).json({
        success: true,
        message: "Product successfully found",
        product: product
      });
    })
    .catch(err => {
      console.log(err);

      return res.status(400).json({
        success: false,
        message: "Could not find the requested product"
      });
    });
};

exports.verify_domain = async function(req, res) {
  const storeId = req.body.storeId;

  Store.findByPk(storeId)
    .then(async store => {
      const verifyDomain = await DNShelper.check_TXT_record(
        "https://wedcast.app",
        store.verificationCode
      );
      if (verifyDomain) {
        if (!store) {
          return res.status(400).json({
            success: false,
            message: "Could not find the requested store"
          });
        }
        store.verified = true;
        store.save().then(result => {
          return res.status(200).json({
            success: true,
            message: "Verification successful"
          });
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Verification failed"
        });
      }
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: "Verification failed"
      });
    });
};
