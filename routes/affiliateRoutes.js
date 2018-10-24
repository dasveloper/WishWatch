const keys = require("../config/keys.js");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
var validator = require("validator");

require("../models/Affiliate");

const Affiliate = mongoose.model("affiliate");

module.exports = app => {
  //Create company
  app.post("/affiliate/createCompany", requireLogin, async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong, please try again"
      });
    }

    const companyName = req.body.companyName;
    if (!companyName) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a company name" });
    }
    const companyWebsite = req.body.companyWebsite;
    if (
      !companyWebsite ||
      !validator.isURL(companyWebsite, {
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
      companyName,
      companyWebsite,
      owners: req.user.id
    }).save(function(err, newAffiliate) {
      console.log(newAffiliate);
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong, please try again"
        });
      } else {
        var newAffiliateBase = {
          id: newAffiliate.id,
          companyName: newAffiliate.companyName
        };
        req.user.companies.push(newAffiliateBase);
        req.user.save(function(err, affiliateBase) {
          if (err) {
            return res.status(400).json({
              success: false,
              message: "Something went wrong, please try again"
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Company successfully created",
              affiliate: newAffiliateBase.id
            });
          }
        });
      }
    });
  });

  //Update company profile
  app.post("/affiliate/updateProfile", requireLogin, async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong, please try again"
      });
    }
    const affiliateId = req.body.affiliateId;
    if (!affiliateId) {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong, please try again." });
    }
    const companyName = req.body.companyName;
    if (!companyName) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a company name" });
    }
    const companyWebsite = req.body.companyWebsite;
    if (
      !companyWebsite ||
      !validator.isURL(companyWebsite, {
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

    var query = { _id: '5bcd137a7cc407380d5a0802' };
    let data= {
      email,
      phone,
      companyName,
      companyWebsite,
    }
    Affiliate.findOneAndUpdate(query, data, { upsert: false }, function(err, newAffiliate) {
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

  //Fetch company details
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
        console.log(err);
        return res.status(400).json({
          success: false,
          message: "Could not find the requested company"
        });
      } else {
        console.log("in");
        return res.status(200).json({
          success: true,
          message: "Company successfully created",
          affiliate: affiliate
        });
      }
    });
  });
};
