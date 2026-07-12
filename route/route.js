const express=require("express");
const multer=require("multer");
const {fileUpload,downloadPage,download}=require("../controlles/controlles")
const path=require("path")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const route=express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "mp4", "mp3"],
  },
});

const upload = multer({ storage });
// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,cloudinary.v2.uploader.upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )).catch((error) => {
//            console.log(error);
//        });
//     },
//     filename:function(req,file,cb){
//         const name=`${Date.now()}-${Math.round(Math.random()*1E9)}-${path.extname(file.originalname)}`;
//         cb(null,name);
//     }
// })
route.get("/", (req, res) => {
    res.redirect("/file/upload");
});
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