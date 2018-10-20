const keys = require("../config/keys.js");
const mongoose = require("mongoose");
var validator = require("validator");

require("../models/Affiliate");

const Affiliate = mongoose.model("affiliate");

module.exports = app => {
  //Logout User
  app.post("/affiliate/updateProfile", async (req, res) => {
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
      !validator.isURL(companyWebsite, 
        { protocols: ["https"], require_protocol: true }
      )
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
      companyWebsite
    }).save(function(err, newAffiliate) {
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
};
