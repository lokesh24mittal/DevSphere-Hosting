const mongoose=require("mongoose");

const subSectionSchema=new mongoose.Schema({
   title:{
    type:String,
    required:true
   },
   timeDuration:{
    type:String,
    required:true
   },
   description:{
    type:String
   },
   videoURL:{
    type:String
   }
});

module.exports=mongoose.model("subSection",subSectionSchema);