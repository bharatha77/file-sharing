const express=require("express");
const mongoose=require("mongoose");
const route=require("./route/route");
const path=require("path");
require("dotenv").config();
const cors = require('cors');


const app=express();
app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static(path.join(__dirname,"publics")))
app.use(express.static(path.join(__dirname,"uploads")))

const dbUrl = process.env.URL;

console.log("DB URI: ", dbUrl);
mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));
  
app.use(cors());

app.use(route);
