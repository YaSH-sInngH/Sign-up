const express = require('express');
const app = express();
const path = require('path');
const pug = require('pug');
const collection = require("./mongodb")

const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', templatePath);
app.use(express.urlencoded({extended: false}));
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get("/", (req,res)=>{
    res.render('login');
});
app.get("/login", (req,res)=>{
    res.render('login');
})
app.get("/signup", (req,res)=>{
    res.render('signup');
});
app.get("/home", (req,res)=>{
    res.render('home');
});
app.post("/signup", async (req,res) =>{

    const data={
        name:req.body.name,
        password:req.body.password
    }

    try{
        await collection.insertMany([data])
        res.render("home")
    }
    catch(error){
        console.log("Error inserting data:", error);
        res.status(500).send("Error Processing signup.");
    }
})

app.post("/login", async (req,res) =>{

    try{
        const check = await collection.findOne({name:req.body.name})
        if(check.password === req.body.password){
            res.render('home');
        }
        else{
            res.send("wrong password")
        }
    }
    catch{
        res.send("Wrong Details, or you are not registered yet.")
    }
    
})

app.listen(4000, ()=>{
    console.log("port connected");
});