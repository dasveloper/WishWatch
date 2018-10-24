const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  companies: [
    {
      companyId: String,
      companyName: String
    }
  ]
});

mongoose.model("users", userSchema);
