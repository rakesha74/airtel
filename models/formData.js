var mongoose = require('mongoose');

var FormData = mongoose.model('formData',{
    firstName:{
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
    lastName:{
        type: String,
        required:true,
        minlength:6
    }
});

module.exports=FormData;