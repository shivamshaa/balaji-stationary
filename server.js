const express=require("express");
const bodyParser=require("body-parser");
const ejs = require('ejs');
const nodemailer = require('nodemailer'); 
const mongoose = require('mongoose');
const expressSitemapXml = require('express-sitemap-xml')

mongoose.connect("mongodb+srv://admin-amit:amitbhattacharjee@balaji-stationers.gywpu.mongodb.net/Balaji-stationers?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false}).then(()=>{
    console.log("database connected");
}).catch((e)=>{
    console.log(e);
});

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(expressSitemapXml(getUrls, 'https://bitmidi.com'))

async function getUrls () {
    return await getUrlsFromDatabase()
  }
let mailTransporter = nodemailer.createTransport({ 
    host: 'smtp.gmail.com', //smtp-mail.outlook.com
    port: 465,              //587
    secure: true,
    logger: true,
    ignoreTLS: true, // add this  
    auth: { 
        user: 'balajistationers26@gmail.com', 
        pass: '$hivAM123'}
    // } , tls: {
    //     ciphers: 'SSLv3'
    // }
}); 


// app.get("/",(req,res)=>{
//     res.render('index');
// })
app.get('/sitemap.xml', function(req, res) {
    res.sendFile(path.join(__dirname + 'sitemap.xml'));
  });
app.post("/data",(req,res)=>{
   
    let txt = 'Dear' + req.body.fname +' '+ req.body.lname +  'your requested quotation for our product is attached in this mail' + 'your details as entered are' + 'phone: '+ req.body.phone
            + 'email: ' + req.body.email + 'company name: ' + req.body.cname + 'company address: '+ req.body.cloc + 'designation: ' + req.body.desig +
            'requested quote: link'
    let mailDetails = { 
        from: 'balajistationers26@gmail.com', 
        to: req.body.email, 
        subject: 'Balaji Stationers Quotation', 
        text: 'Dear ' + req.body.fname +' '+ req.body.lname + ' your requested quotation for our products is attached in this mail, ' + 'your details as entered are ' + 'Phone No.: '+ req.body.phone
        + ' Email Address: ' + req.body.email + ' Company Name: ' + req.body.cname + ' Company Location: '+ req.body.cloc + ' Designation: ' + req.body.desig +
        ' Requested Quote:https://drive.google.com/drive/folders/1euOjeEnZMroDPiWRewx4IXbFs1olwW_r?usp=sharing'
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

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});