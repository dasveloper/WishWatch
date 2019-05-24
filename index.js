const authRoutes = require("./routes/authRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");
const storeRoutes = require("./routes/storeRoutes");
const userRoutes = require("./routes/userRoutes");
const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
var cors = require("cors");
var bodyParser = require("body-parser");
const keys = require("./config/keys");
const fileUpload = require("express-fileupload");
const aws = require("aws-sdk");
const sequelize = require("./services/database");
const Store = require("./models/store");
const Product = require("./models/product");
const User = require("./models/user");
const UserProduct = require("./models/userProduct");
const Offer = require("./models/offer");

require("./services/passport");

const app = express();
app.use(fileUpload());
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
storeRoutes(app);
userRoutes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

aws.config.update({
  region: "us-east-2",
  accessKeyId: keys.awsAccessKey,
  secretAccessKey: keys.awsSecretKey
});

Product.belongsToMany(User, {
  through: UserProduct
});
User.belongsToMany(Product, {
  through: UserProduct
});
UserProduct.hasMany(User);
UserProduct.hasMany(Product);
Store.hasMany(Product, { as: "Products" });
Product.hasMany(Offer, { as: "Offers" });
Offer.belongsTo(Product);
Product.belongsTo(Store);


 sequelize
  .sync({alter:true})
  .then(result => {
    //console.log(result);
    // sequelize.query('SELECT * FROM node_js.identifies', { type: sequelize.QueryTypes.SELECT})
    // .then(function(users) {
    //   console.log("!!!!!!!!!!!!!!!");
    //   console.log(users);
      // We don't need spread here, since only the results will be returned for select queries
    // }).catch(err => {
    //   console.log(err);
    // });
  })
  .catch(err => {
   console.log("error");
   });



const PORT = process.env.PORT || 5000;
app.listen(PORT);
