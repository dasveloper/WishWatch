const authRoutes = require("./routes/authRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");
const affiliateRoutes = require("./routes/affiliateRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const express = require("express");

const cookieSession = require("cookie-session");
const passport = require("passport");
var cors = require("cors");
var bodyParser = require("body-parser");

const keys = require("./config/keys");

//New
//const db = require("./services/database");
const sequelize = require("./services/database");
const Store = require("./mysql_models/store");
const Product = require("./mysql_models/product");
const User = require("./mysql_models/user");
const UserProduct = require("./mysql_models/userProduct");

require("./services/passport");

Product.belongsToMany(User, {
  through: UserProduct
});
User.belongsToMany(Product, {
  through: UserProduct
});
UserProduct.hasMany(User);
UserProduct.hasMany(Product);
Product.belongsTo(Store)
Store.hasMany(Product, {as: 'Products'})

sequelize
  .sync()
  .then(result => {
   // console.log(result);
  })
  .catch(err => {
    console.log("error");
  });


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
subscribeRoutes(app);
affiliateRoutes(app);
productRoutes(app);
userRoutes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
