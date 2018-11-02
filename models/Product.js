const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
 
    sku: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    owner: {type: String, required: true},
    image_url: {type: String, required: true}
});

mongoose.model('product', productSchema);