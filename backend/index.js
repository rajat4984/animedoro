const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("Hello world")
})


app.listen(8800,()=>{
    console.log("Backend started");
})
