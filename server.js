const express=require("express");
const bodyParser=require("body-parser");
const ejs = require('ejs');
const nodemailer = require('nodemailer'); 


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

let mailTransporter = nodemailer.createTransport({ 
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    logger: true,
    ignoreTLS: true, // add this  
    auth: { 
        user: 'shaagupta04@gmail.com', 
        pass: '@mitBT123'
    } 
}); 


// app.get("/",(req,res)=>{
//     res.render('index');
// })

app.post("/data",(req,res)=>{
   
    console.log(req.body.desig);
    let txt = 'hello' + req.body.desig + 'how '
    let mailDetails = { 
        from: 'shaagupta04@gmail.com', 
        to: req.body.email, 
        subject: 'Test mail', 
        text: 'Some random link'
    }; 
    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log(err); 
        } else { 
            console.log('Email sent successfully'); 
            res.redirect("/");
        } 
    }); 
    // res.send("received");
    
})

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/:type",(req,res)=>{
    res.render(req.params.type);
} )

app.listen(3000,function(){
    console.log("server is running on port 3000");
});