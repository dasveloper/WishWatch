const mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  stores: [
    {
      storeId: String,
      storeName: String
    }
  ],
  local: {
    email: String,
    password: String,
  },
  watching:[]
});


userSchema.methods.generateHash = function(password) {  
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {  
  return bcrypt.compareSync(password, this.local.password);
};

mongoose.model("users", userSchema);
