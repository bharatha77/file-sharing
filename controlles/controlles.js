const model=require("../models/model");
const shortid=require("shortid");
const path=require("path");
const { error } = require("console");


const fileUpload=async(req,res)=>{
    const {filename,size,path}=req.file;
    const shortids=shortid.generate();
    const file=new model({
        filename,
        path,
        shortids,
        size
    })
    try {
        const response=await file.save();
        res.json({file:`${process.env.BASE_URL}/file/${response.shortids}`})
    } catch (error) {
        res.send({error:"Some Thing Wrong"})
    }
}
const downloadPage=async(req,res)=>{
    
    const shortids=req.params.shortids;
    console.log(shortids)
    try {
        const files = await model.findOne({ shortids});
        if(!files){
            return res.render("error",{error:"File not found"});
        }
        return res.render("download",{
            filename:files.filename,
            size:files.size,
            download:`${process.env.BASE_URL}/file/download/${files.shortids}`,
            error:null
        })
    } catch (error) {
        return res.render("error",{error:"Something Went Wrong"});
    }
}

const download=async(req,res)=>{
    const shortids=req.params.shortids;
    try {
        const files = await model.findOne({ shortids});
        console.log(files)
        if(!files){
           return res.render("error",{error:"File not found"});
        }
        const filepath=`${__dirname}/../${files.path}`
       return res.download(filepath)
    } catch (error) {
        return res.render("error",{error:"Something Went Wrong"});
    }

}

module.exports={fileUpload,downloadPage,download}