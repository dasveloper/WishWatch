const passport = require("passport");
const Analytics = require("analytics-node");

const analytics = new Analytics("2p8ieF9XTkHVmRbyvhZ1RVQsrhu0xg2b");

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
        analytics.identify({
          userId: '22221111',
          traits: {
            name: 'Michael Bolton',
            email: 'mbolton@initech.com',
            plan: 'Enterprise',
            friends: 42
          }
        });
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
