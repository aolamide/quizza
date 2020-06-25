import mongoose from 'mongoose';
import uuidv1 from 'uuid/v1';
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type: String,
        required : true
    },
    hashed_password :String, 
    salt : String,
    joined : {
        type: Date,
        default : Date.now
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    resetPasswordToken : String,
    resetExpires : Date
});

userSchema.virtual('password')
.set(function(password) {
    //create temporary variable called _password
    this._password = password
    //generate a timestamp
    this.salt = uuidv1()
    //encryptPassword
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._password
})

//methods
userSchema.methods = {
    authenticate : function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword : function(password) {
        if(!password) return "";
        try {
           return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        } catch(err) {
            return ""
        }
    }
}



const userModel = mongoose.model('User', userSchema);

export default userModel;