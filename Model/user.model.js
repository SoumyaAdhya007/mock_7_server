const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    profile_picture:{type:String,default:"false"},
    name:{type:String,default:"fasle"},
    bio:{type:String,default:"fasle"},
    phone:{type:Number,default:0},
    email:{type:String,required:true},
    password:{type:String,required:true},
})
const UserModel=mongoose.model("user",userSchema);
module.exports={
    UserModel
}