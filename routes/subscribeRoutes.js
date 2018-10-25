const keys = require("../config/keys.js");
const mongoose = require("mongoose");
var validator = require("validator");

require("../models/EmailSubscription");

const EmailSubscription = mongoose.model("emailSubscriptions");

module.exports = app => {
  //Logout User
  app.post("/api/subscribe", async (req, res) => {
    if (!req.body || !req.body.email) {
      return res
        .status(400)
        .json({success: false, message: "Please provide an email address" });
    }
    const email = req.body.email;
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({success: false, message: "Please provide a valid email address" });
    }
    const subscription = await new EmailSubscription({
      email
    }).save(function (err, product) {
        if (err) {
            return res
            .status(400)
            .json({success: false, message: "Something went wrong, please try again" });
        }
        else{
            return res
            .status(200)
            .json({ success: true, message: "You have successfully subscribed" });
        }
      })

  });

};
