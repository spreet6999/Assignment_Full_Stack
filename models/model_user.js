const mongoose =require('mongoose');
const Schema=mongoose.Schema;



const userSchema = new Schema({
       name:{type:String, required:true},
       mail:{type:String, required:true},
       roles:[{type:Number,required:true}],
});
module.exports=mongoose.model('User',userSchema);