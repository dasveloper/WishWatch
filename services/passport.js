const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt-nodejs");

const keys = require("../config/keys.js");
const SQLUser = require("../mysql_models/user");

//Put user in token
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Get user from token
passport.deserializeUser((id, done) => {
  SQLUser.findByPk(id).then(user => {
    done(null, user);
  });
});

const generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
const validPassword = function(password, passwordAttempt) {
  return bcrypt.compareSync(password, passwordAttempt);
};

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
        SQLUser.findOne({ where: { email: email } })
          .then(user => {
            if (!!user) {
              return done(null, false, "That email is already in use.");
            }

            SQLUser.create({
              email,
              password: generateHash(password)
            })
              .then(newUser => {
                return done(null, newUser);
              })
              .catch(err => {
                throw err;
              });
          })
          .catch(err => {
            return done(err);
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
      SQLUser.findOne({ where: { email: email } })
        .then(user => {
          if (!user) {
            return done(null, false, "Email or password is incorrect");
          }

          if (!validPassword(password, user.dataValues.password))
          return done(null, false, "Email or password is incorrect");


          return done(null, user.dataValues);
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);
