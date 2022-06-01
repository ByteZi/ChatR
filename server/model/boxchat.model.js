const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

// const validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

const validateName = (userName) => {
    var re = /^\S*[a-zA-Z0-9]$/
    return re.test(userName);
}

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
        required : [true,'Username is required'],
        minlength : [5, 'User name is too short'],
        validate : [validateName,'User name should not have spaces'],
        unique : [true, 'Name is already taken']
    },
    password : {
        type: String,
    }
},{timestamps : true})

// Confirm Password
UserSchema.virtual('confirmPassword')
  .get( () => this.confirmPassword )
  .set( value => this.confirmPassword = value );

UserSchema.pre('validate', function(next){
    if(this.password.length == 0 ){
        this.invalidate('emptyPassword','Password is required')
    }else if (this.password.length < 3 ){
        this.invalidate('shortPassword',"Password is too short")
    }else if (this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords do not match')
    }
    next();
})

//BCrypt
UserSchema.pre("save", function(next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
});

const User = mongoose.model('User', UserSchema)
module.exports = User