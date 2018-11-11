const keys = require("../config/keys.js");
const requireLogin = require("../middlewares/requireLogin");
var validator = require("validator");
var dns = require("dns");
var url = require("url");

const Store = require("../mysql_models/store");


module.exports = app => {
  //Create store
  app.post("/affiliate/createStore", requireLogin, async (req, res) => {
    const storeName = req.body.storeName;
    if (!storeName) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a store name" });
    }
    const storeWebsite = req.body.storeWebsite;
    if (
      !storeWebsite ||
      !validator.isURL(storeWebsite, {
        protocols: ["https"],
        require_protocol: true
      })
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid url prefixed with https://"
      });
    }
    const phone = req.body.phone;
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number"
      });
    }

    const email = req.body.email;
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    Store.create({
      name: storeName,
      website: storeWebsite,
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
  });

  //Update store profile
  app.post("/affiliate/updateProfile", requireLogin, async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong, please try again"
      });
    }
    const affiliateId = req.body.affiliateId;
    if (!affiliateId) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong, please try again."
      });
    }
    const storeName = req.body.storeName;
    if (!storeName) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a store name" });
    }
    const storeWebsite = req.body.storeWebsite;
    if (
      !storeWebsite ||
      !validator.isURL(storeWebsite, {
        protocols: ["https"],
        require_protocol: true
      })
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid url prefixed with https://"
      });
    }
    const phone = req.body.phone;
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number"
      });
    }

    const email = req.body.email;
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    let data = {
      email,
      phone,
      storeName,
      storeWebsite
    };


    Store.findByPk(affiliateId)
    .then(store => {
      if (!store) {
        return res.status(400).json({
          success: false,
          message: "Could not find the requested store"
        });
      }
      store.email = email;
      store.phone = phone;
      store.name = storeName;
      store.website = storeWebsite;
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
  });

  //Fetch store details
  app.get("/affiliate/fetchStores", (req, res) => {
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
  });

  //Fetch store details
  app.get("/affiliate/fetchDetails", (req, res) => {
    var affiliateId = req.query.affiliateId;

    Store.findByPk(affiliateId)
      .then(store => {
        return res.status(200).json({
          success: true,
          message: "Store details successfully found",
          affiliate: store
        });
      })
      .catch(err => {
        return res.status(400).json({
          success: false,
          message: "Could not find the requested store"
        });
      });
  });

  //Verify store domain
  app.post("/affiliate/verifyDomain", (req, res) => {
    const storeUrl = "https://wedcast.app";
    const hostName = url.parse(storeUrl).hostname;
    var affiliateId = req.body.affiliateId;
    var domain = dns.resolveTxt(hostName, function(err, records) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Verification failed"
        });
      } else {
        let success = false;
        if (records.length) {
          records.forEach(function(txtRecords) {
            if (txtRecords.length) {
              txtRecords.forEach(function(record) {
                try {
                  const verificationKey = record.split("=")[0];
                  const verificationValue = record.split("=")[1];
                  if (
                    verificationKey === "wishwatch-verification" &&
                    verificationValue === "1234567890"
                  )
                    success = true;
                } catch (err) {
                  console.log(err);
                }
              });
            }
          });
        }
        if (success) {
          const doc = {
            verified: true
          };

          Store.findByPk(affiliateId)
            .then(store => {
              if (!store) {
                return res.status(400).json({
                  success: false,
                  message: "Could not find the requested store"
                });
              }
              store.verified = true;
              store.save();
            })
            .then(result => {
              return res.status(200).json({
                success: true,
                message: "Verification successful"
              });
            })
            .catch(err => {
              return res.status(400).json({
                success: false,
                message: "Verification failed"
              });
            });
        } else {
          return res.status(400).json({
            success: false,
            message: "Verification failed"
          });
        }
      }
    });
  });
};
