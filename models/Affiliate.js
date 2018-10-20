const mongoose = require('mongoose');
const {Schema} = mongoose;

const affiliateSchema = new Schema({
    companyName: String,
    companyWebsite: String,
    phone: String,
    email: String
});

mongoose.model('affiliate', affiliateSchema);