const mongoose=require("mongoose");

const fileSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true,
    },
    path:{
        type:String,
        required:true,
    },
    size:{
        type:Number,
        required:true,
    },
    shortids:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:'48h'
    }
})

const model=mongoose.model("files",fileSchema);
module.exports=model;