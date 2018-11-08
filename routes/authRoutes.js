const passport = require("passport");

module.exports = app => {
  //Request Google Auth
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  //Local
  app.post("/auth/signup", (req, res, next) => {
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
  });

  app.post("/auth/login", (req, res, next) => {
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
  });

  //Callback Google Auth
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );
  //Check user status
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
  //Logout User
  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
