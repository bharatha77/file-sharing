const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
require("dotenv").config();
const route=require("./route/route");
const cors = require('cors');


const app=express();
app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static(path.join(__dirname,"publics")))
app.use(express.static(path.join(__dirname,"uploads")))

const dbUrl = process.env.URL;

mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));
  
app.use(cors());

app.use(route);
app.use((err, req, res, next) => {
  console.error("Express error handler:", err.stack || err);
  if (req.xhr || req.headers.accept?.includes("json")) {
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
  return res.status(500).send("Internal Server Error");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
