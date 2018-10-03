const mongoose = require('mongoose');
const {Schema} = mongoose;

const emailSubscriberSchema = new Schema({
    email: String
});

mongoose.model('emailSubscriptions', emailSubscriberSchema);