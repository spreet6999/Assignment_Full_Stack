const mongoose =require('mongoose');
const Schema=mongoose.Schema;



const interviewSchema = new Schema({
       start_time:{type:Number,required:true},
       end_time:{type:Number,required:true},
       participant_names:[{type: String, required:true}],
});
module.exports=mongoose.model('Interview',interviewSchema);