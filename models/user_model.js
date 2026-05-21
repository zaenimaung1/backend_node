const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name : {type : String, required : true ,unique: true},
    phone : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    unit : {type : Schema.Types.Int32 , default : 0},
    type : {type : String,enum : ['Buyer','Seller'] , default : "Buyer"},
    created : {type : Date, default : Date.now}
});

const User = mongoose.model('Users',userSchema);

module.exports = User;