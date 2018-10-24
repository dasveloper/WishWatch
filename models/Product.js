const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    productName: String,
});

mongoose.model('product', productSchema);