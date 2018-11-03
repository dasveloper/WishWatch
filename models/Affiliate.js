const mongoose = require('mongoose');
const {Schema} = mongoose;

const affiliateSchema = new Schema({
    storeName: String,
    storeWebsite: String,
    phone: String,
    email: String,
    owners: [String],
    verified: { type: Boolean, default: false }


});

mongoose.model('affiliate', affiliateSchema);