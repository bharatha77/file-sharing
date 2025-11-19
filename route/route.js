const express=require("express");
const multer=require("multer");
const {fileUpload,downloadPage,download}=require("../controlles/controlles")
const path=require("path")
const route=express.Router();

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads")
    },
    filename:function(req,file,cb){
        const name=`${Date.now()}-${Math.round(Math.random()*1E9)}-${path.extname(file.originalname)}`;
        cb(null,name);
    }
})
const upload=multer({storage})
route.get("/file/upload",(req,res)=>{
    res.render("fileUpload")
})
route.post("/file/upload", upload.single("file"),fileUpload)
route.get("/file/:shortids",downloadPage)
route.get("/file/download/:shortids",download);
route.get("*",(req,res)=>{
    res.status(404).render("error", {
        error: "Sorry, the page you are looking for does not exist."
    });
})
module.exports=route;