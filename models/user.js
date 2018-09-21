var mongoose = require('mongoose');

var User = mongoose.model('user',{
    username:{
        type:String,
        required: true,
        minlength:1,
        trim:true
    },
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minlength:6
    },
    name:{
        type: String,
        required:true,
        minlength:6
    },
    contact_detail:{
        type: String,
        required:true,
        minlength:10
    }
});

module.exports=User;