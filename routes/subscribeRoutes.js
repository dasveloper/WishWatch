const keys = require("../config/keys.js");
var validator = require("validator");

const EmailSubscriber = require("../models/emailsubscriber");

module.exports = app => {
  app.post("/api/subscribe", async (req, res) => {
    if (!req.body || !req.body.email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide an email address" });
    }
    const email = req.body.email;
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }
    EmailSubscriber.create({
      email
    })
      .then(subscriber => {
        return res
          .status(200)
          .json({ success: true, message: "You have successfully subscribed" });
      })
      .catch(err => {
        return res.status(400).json({
          success: false,
          message: "Something went wrong, please try again"
        });
      });
  });
};
