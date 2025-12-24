import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

// defining the schema for the users
const userSchema = new Schema({
    userName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        index : true, // Optimized for faster querying by email
    },
    password : {
        type : String,
        required : true,
    },    
    profilePhoto : {
        type : String,      
        
    },
    refreshToken : {
        type : String,
        default : "null"
    }
});

// Middleware (Hook): Runs automatically before a user document is saved
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


// Custom Method: Compares a plain text password with the hashed password in the DB
userSchema.methods.isPasswordCorrect = async function(password) {
    const boolCheckforPasswordCorrect = bcrypt.compare(password,this.password);
    return boolCheckforPasswordCorrect;
}

// Custom Method: Generates a short-lived JSON Web Token for authentication
userSchema.methods.generateAccessToken = async function(){
    const dataStored = {
        _id : this._id
    };

    return  jwt.sign(dataStored,process.env.JWT_ACCESS_TOKEN_SECRET,{
        expiresIn : "1d" // Token expires in 1 day
    });

}

// Custom Method: Generates a long-lived token to obtain new access tokens
userSchema.methods.generateRefreshToken = async function(){
    const dataStored = {
        _id : this._id
    };
    return jwt.sign(dataStored,process.env.JWT_REFRESH_TOKEN_SECRET,{
        expiresIn : "30d", // Token expires in 30 days
    }) 
    
}

// Compile the schema into a Model named "USERS" and link it to the "users" collection
const USERS = mongoose.model("USERS",userSchema,"users");

export default USERS;