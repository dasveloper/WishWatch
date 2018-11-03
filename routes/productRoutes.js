const keys = require("../config/keys.js");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
var validator = require("validator");
const fileUpload = require("express-fileupload");
var fs = require("fs");
const aws = require("aws-sdk");
const S3_BUCKET = keys.awsBucket;
var path = require("path");

var request = require("request");
aws.config.update({
  region: "us-east-2",
  accessKeyId: keys.awsAccessKey,
  secretAccessKey: keys.awsSecretKey
});

require("../models/Product");

const Product = mongoose.model("product");

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

  app.post("/product/addProduct", requireLogin, async (req, res) => {

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
      let upsertProduct = {
        updateOne: {
          filter: { sku: product.sku },
          update: product,
          upsert: true
        }
      };
      accepted.push(upsertProduct);
    }
    // now bulkWrite (note the use of 'Model.collection')
    Product.collection.bulkWrite(accepted, function(err, docs) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong, please try again"
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Products successfully added",
          accepted: { count: accepted.length, list: accepted },
          rejected: { count: rejected.length, rejected: rejected },

          affiliate: docs
        });
      }
    });
  });

  app.get("/product/fetchAffiliateProducts", requireLogin, (req, res) => {
    var affiliateId = req.query.affiliateId;

    Product.find({ owner: affiliateId }, function(err, products) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Could not find the requested store's products"
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Products successfully found",
          products: products
        });
      }
    });
  });
};
