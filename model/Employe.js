const mongoose = require('mongoose');
const Employe= mongoose.model("Employe",{
    id  : { type : Number, required : true },
    imageUrl : {type : String,required : false},
    firstName  : { type : String,required : true},
    lastName  : {type : String,required : true},
    email  : {type : String,required : true},
    contactNumber  : {type : Number,required : true},
    age  : {type : Number,required : false},
    dob  : {type : String,required : true},
    salary  : {type : Number,required : false},
    address  : {type : String,required : false}
})
module.exports = Employe;