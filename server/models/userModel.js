const mongoose = require('mongoose')
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username:{
        type:String ,
        unique: true 
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    }
})
const uplaodSchema= new mongoose.Schema({
    filePath:{
        type:String ,
    },
    filename:{
        type:String,
    },
    fileSize:{
        type:String,
    },
    fileDimension:{
        type:[Number],
    },
    fileForamt:{
        type:String,
    },
    public_id:{
        type:String,
    },
    owner:{
        type: String ,
    },
    }, {
    timestamps:true
})

const User  = mongoose.model('User' , userSchema)

const UploadImage = mongoose.model('UploadImage' , uplaodSchema)

// export default User ;

userSchema.pre("save", async function(next){            // pre hook (just after saving), ::: save , update, validate 
    if (!this.isModified("password")) return next()         //  if password field is modified  then change else no  
    this.password  =await bcrypt.hash(this.password, 10 )                // encryption
    next()  
})    

userSchema.methods.isPasswordCorrect = async function (password) {       // custom method added  
   return await bcrypt.compare(password, this.password)     // bcrypt has function compare :::  (encrypted password,given password  ) 
    // returns true or false 
}

module.exports = {User , UploadImage };

