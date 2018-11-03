const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var LocalStrategy = require("passport-local").Strategy;

const keys = require("../config/keys.js");
const mongoose = require("mongoose");
const User = mongoose.model("users");

//Put user in token
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Get user from token
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true //To allow https from Heroku
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        //user exists already
        done(null, existingUser);
      } else {
        //create new user
        const user = await new User({
          googleId: profile.id
        }).save();
        done(null, user);
      }
    }
  )
);

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      proxy: true //To allow https from Heroku
    },
    function(req, email, password, done) {
      process.nextTick(function() {
        User.findOne({ "local.email": email }, function(err, user) {
          if (err) return done(err);
          if (user) return done(null, false, "That email is already in use.");
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        });
      });
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      proxy: true //To allow https from Heroku
    },
    function(req, email, password, done) {
      User.findOne({ "local.email": email }, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, "Email or password is incorrect");
        if (!user.validPassword(password)) return done(null, false,  "Email or password is incorrect");
        return done(null, user);
      });
    }
  )
);
