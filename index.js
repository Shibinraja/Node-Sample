const os = require('os');

const fs = require('fs');

const express = require('express')
const app = express();


// fs.writeFile('message.txt','This is the file from the NodeJs',function(err){
//     if (err) throw err;
//     console.log("File Created Successfully")
// });

// console.log(fs)
app.get('/',function(req,res){
    res.send("<h1>Hello from Nodejs</h1>")
});

app.get('/about',function(req,res){
   res.send("<h1>About from Nodejs</h1>") 
});

app.get('/service',function(req,res){
     res.status(200).json({
        "Message":"Permitted"
    })
})



app.listen(3000);