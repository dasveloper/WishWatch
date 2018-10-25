const authRoutes = require('./routes/authRoutes');
const subscribeRoutes = require('./routes/subscribeRoutes');
const affiliateRoutes = require('./routes/affiliateRoutes');
const productRoutes = require('./routes/productRoutes');

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
var cors = require('cors')
var bodyParser = require('body-parser');

const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoUri);

const app = express();
console.log("IN");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize());
app.use(passport.session());
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);
authRoutes(app);
subscribeRoutes(app);
affiliateRoutes(app);
productRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
