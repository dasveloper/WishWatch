const passport = require("passport");

exports.signup_local = function(req, res, next) {
  passport.authenticate("local-signup", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (user) {
      req.login(user, err => {
        if (err) {
          return next(err);
        }

        return res.send(user);
      });
    } else {
      return res.status(400).send(info);
    }
  })(req, res, next);
};
exports.login_local = function(req, res, next) {
  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (user) {
      req.login(user, err => {
        if (err) {
          return next(err);
        }
        return res.send(user);
      });
    } else {
      return res.status(400).send(info);
    }
  })(req, res, next);
};
exports.login_google = function(req, res) {
  passport.authenticate("google", {
    scope: ["profile", "email"]
  });
};

exports.google_callback = function(req, res) {
  passport.authenticate("google"),
    (req, res) => {
      res.redirect("/dashboard");
    };
};

exports.fetch_current_user = function(req, res) {
  res.send(req.user);
};

exports.logout_user = function(req, res) {
  req.logout();
  res.redirect("/");
};
