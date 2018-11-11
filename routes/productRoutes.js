const keys = require("../config/keys.js");
const requireLogin = require("../middlewares/requireLogin");
const verifyStoreOwner = require("../middlewares/verifyStoreOwner");

var validator = require("validator");
const fileUpload = require("express-fileupload");
var fs = require("fs");
const aws = require("aws-sdk");
const S3_BUCKET = keys.awsBucket;
var path = require("path");
const SQLProduct = require("../mysql_models/product");

var request = require("request");
aws.config.update({
  region: "us-east-2",
  accessKeyId: keys.awsAccessKey,
  secretAccessKey: keys.awsSecretKey
});


function validate(value, type) {
  switch (type) {
    case "string":
      return value && !validator.isEmpty(value, { ignore_whitespace: true });
    case "url":
      return (
        value &&
        !validator.isURL(value, {
          protocols: ["https, http"],
          require_protocol: true
        })
      );
    default:
      return value && validator.isEmpty(value, { ignore_whitespace: true });
  }
  return value == null || value.length === 0;
}
function saveImage(url, key) {
  let ext = path.extname(url);
  let params = {
    Key: key + ext,
    Bucket: S3_BUCKET,
    ACL: "public-read"
  };
  return new Promise(function(resolve, reject) {
    request.get(url).on("response", function(response) {
      if (response.statusCode === 200) {
        params.ContentType = response.headers["content-type"];
        var s3 = new aws.S3({ params })
          .upload({ Body: response })
          .send(function(err, data) {
            resolve(data);
          });
      } else {
        // return false;
        reject(false);
      }
    });
  });
}

module.exports = app => {
  app.use(fileUpload());
  //verifyStoreOwner, add to middleware after requireLogin
  app.post("/product/addProduct", requireLogin, async (req, res) => {
    var affiliateId = req.body.affiliateId;
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
      if (!validate(product.sku, "string")) {
        rejected.push(product);
        return;
      }
      if (!validate(product.image_url, "url")) {
        rejected.push(product);
        return;
      }
      try {
        let result = await saveImage(product.image_url, `123/${product.sku}`);
        product.image_url = result.Location;
      } catch (err) {
        // catches errors both in fetch and response.json
        return res.status(400).json({
          success: false,
          message: "Could not upload image",
          error: err
        });
      }
      product.storeId = affiliateId;
      //product.updated = Date.now();
      // let upsertProduct = {
      //   updateOne: {
      //     filter: { sku: product.sku, owner: affiliateId},
      //     update: product,
      //     upsert: true,
      //   }
      // };
      accepted.push(product);
    }

    SQLProduct.bulkCreate(accepted, {
      fields: ["id", "sku", "name", "storeId", "image_url"],
      updateOnDuplicate: ["name", "name", "storeId","image_url", "updatedAt"]
    })
      .then(products => {
        return res.status(200).json({
          success: true,
          message: "Products successfully added",
          accepted: { count: accepted.length, list: accepted },
          rejected: { count: rejected.length, rejected: rejected },

          products: products
        });
      })
      .catch(err => {
        return res.status(400).json({
          success: false,
          message: "Something went wrong, please try again"
        });
      });
  });

  app.get("/product/fetchAffiliateProducts", requireLogin, (req, res) => {
    var affiliateId = req.query.affiliateId;
    SQLProduct.findAll({ where: { storeId: affiliateId } })
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
  });

  app.get("/product/fetchProduct", (req, res) => {
    const {storeId, productId} = req.query;
    SQLProduct.findOne({ where: { storeId: storeId, sku: productId } })
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
  });
};
