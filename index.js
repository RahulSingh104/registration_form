const express= require("express");
const bodyParser=require("body-parser");
const mongoose =require("mongoose");

const app= express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}));
mongoose.connect("mongodb://localhost:27017/Database");
const db = mongoose.connection
db.on("error",()=> console.log("Error in Connecting to database"))
db.once("open",()=>console.log("Connected to Database"))

app.post("signup",(req, res)=>{
    const name= req.body.name
    const age= req.body.age
    const email = req.body.email
    const photo = req.body.photo 
    const gender =req.body.gender 
    const password = req.body.password 
     
    const data ={
        "name":name,
        "age ":age,
        "email":email,
        "photo":photo,
        "gender":gender,
        "password":password 
    }
    db.collection("users").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
    return res.redirect("signup.html")
})
app.get("/",(req, res)=>{
    res.set({
        "Allow-access-Allow-Orgin":'*'
    })
    return res.redirect("index.html")
}).listen(5000);

console.log("Listening on port 5000");