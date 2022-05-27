const validator = require('validator')
const mongoose = require('mongoose')

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, "Email Required"],
        unique : [true, "Email is already taken!"],
        validate : [validator.isEmail, 'Invalid email']
    },
    emailValidate : {
        type : Boolean,
        default : false
    },
    userName : {
        type : String,
        minlength : [5, 'User name is too short'],
        unique : [true, 'Name is already taken']
    },
    password : {
        type: String,
        minlength : [8, 'Password is too short']
    }
},{timestamps : true})

const User = mongoose.model('User', UserSchema)
module.exports = User