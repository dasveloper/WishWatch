const authRoutes = require('./routes/authRoutes');

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
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) =>{
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })


app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
