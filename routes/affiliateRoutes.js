const keys = require("../config/keys.js");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
var validator = require("validator");
var dns = require("dns");
var url = require("url");

require("../models/Affiliate");

const Affiliate = mongoose.model("affiliate");

module.exports = app => {
  //Create store
  app.post("/affiliate/createStore", requireLogin, async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong, please try again"
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

    const affiliate = await new Affiliate({
      email,
      phone,
      storeName,
      storeWebsite,
      owners: req.user.id
    }).save(function(err, newAffiliate) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong, please try again"
        });
      } else {
        console.log(newAffiliate);
        console.log(newAffiliate.id);

        var newAffiliateBase = {
          storeId: newAffiliate.id,
          storeName: newAffiliate.storeName
        };
        req.user.stores.push(newAffiliateBase);
        req.user.save(function(err, affiliateBase) {
          if (err) {
            return res.status(400).json({
              success: false,
              message: "Something went wrong, please try again"
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Store successfully created",
              affiliate: newAffiliateBase.storeId
            });
          }
        });
      }
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

    var query = { _id: "5bcd137a7cc407380d5a0802" };
    let data = {
      email,
      phone,
      storeName,
      storeWebsite
    };
    Affiliate.findOneAndUpdate(query, data, { upsert: false }, function(
      err,
      newAffiliate
    ) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong, please try again"
        });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Profile successfully updated" });
      }
    });
  });

  //Fetch store details
  app.get("/affiliate/fetchDetails", (req, res) => {
    var affiliateId = req.query.affiliateId;
    if (!mongoose.Types.ObjectId.isValid(affiliateId)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid affiliate ID"
      });
    }
    Affiliate.findById(affiliateId, function(err, affiliate) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Could not find the requested store"
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Store details successfully found",
          affiliate: affiliate
        });
      }
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
                console.log(record);
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
          Affiliate.updateOne({ _id: affiliateId }, doc, function(err, raw) {
            if (err) {
              return res.status(400).json({
                success: false,
                message: "Verification failed"
              });
            }
            console.log(success);
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
      }
    });
  });
};
