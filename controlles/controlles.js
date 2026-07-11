const model=require("../models/model");
const shortid=require("shortid");
const path=require("path");
const axios = require("axios");
const cloudinary = require("cloudinary").v2

const fileUpload = async (req, res) => {
    try {
        console.log("Uploaded file object:", req.file);
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const { originalname, size, path: filePath, public_id, secure_url, url } = req.file;
        const shortids = shortid.generate();
        const remotePath = secure_url || url || filePath;
        const file = new model({
            filename: originalname,
            path: remotePath,
            public_id: public_id || filePath,
            shortids,
            size,
        });

        const response = await file.save();
        res.json({ file: `${process.env.BASE_URL}/file/${response.shortids}` });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Something went wrong during upload." });
    }
};

const downloadPage = async (req, res) => {
    const shortids = req.params.shortids;
    try {
        const files = await model.findOne({ shortids });
        if (!files) {
            return res.render("error", { error: "File not found" });
        }

        return res.render("download", {
            filename: files.filename,
            size: files.size,
            download: `/file/download/${files.shortids}`,
            error: null,
        });
    } catch (error) {
        console.error("Download page error:", error);
        return res.render("error", { error: "Something went wrong." });
    }
};


const download = async (req, res) => {
    try {
        const { shortids } = req.params;
        const file = await model.findOne({ shortids });

        if (!file) {
            return res.render("error", { error: "File not found" });
        }

        // fetch the file from Cloudinary as a stream
        const response = await axios.get(file.path, { responseType: "stream" });

        // force download with original filename, hide Cloudinary origin
        res.setHeader("Content-Disposition", `attachment; filename="${file.filename}"`);
        res.setHeader("Content-Type", response.headers["content-type"]);

        // pipe Cloudinary's response straight to the client
        response.data.pipe(res);
    } catch (error) {
        console.error("Download error:", error);
        return res.render("error", { error: "Something went wrong." });
    }
};

// const download = async (req, res) => {
//     const { shortids } = req.params;
//     try {
//         const file = await model.findOne({ shortids });
//         if (!file) {
//             return res.render("error", { error: "File not found" });
//         }
//         return res.download(file.path);
//     } catch (error) {
//         return res.render("error", { error: "Something Went Wrong" });
//     }
// };

module.exports={fileUpload,downloadPage,download}