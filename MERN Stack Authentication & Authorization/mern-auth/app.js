const express = require('express')
const mongoose=require('mongoose');
const router=require("./routes/user-routes")

const app=express();
app.use(express.json())   //only json data accepted to the server, means we are sending json data from the clients
app.use('/api',router)

mongoose.connect('mongodb+srv://kamdev:hMOCEM9qluqRDIol@cluster0.rlabz7c.mongodb.net/mern-auth?retryWrites=true&w=majority')
.then(()=>{
    app.listen(5000);
    console.log("Database is connected and listening on port 5000");
})
.catch((err)=>console.log(err));