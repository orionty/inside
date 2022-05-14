const express = require("express")
const path = require('path')
const nodemailer = require("nodemailer")
var mysql = require("mysql")
var bodyParser=require('body-parser')

const app = express();

var connection = require('./database');

connection.connect((err) => {
  if (err)
   throw err;

  console.log('Database connected!');
});


var registerController=require('./controllers/register-controller');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//Registration
app.post('/register', async (req, res) => {
  const result = await registerController.register(req.body)
  res.json(result)
});

app.post('/order', async (req, res) => {
  const result = await registerController.orderNow(req.body)
  res.json(result)
});




app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public')); 
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'))
});

//menu html
app.get("/menu", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/menu.html'))
  });

//galleries html
app.get("/galleries", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/galleries.html'))
  });

//events html
app.get("/events", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/events.html'))
  });

app.post('/', (req,res)=>{
  console.log(req.body);

  //transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'okyereamponsah78@gmail.com',
      pass: ''

    }

  })

//mailOption
const mailOption = {
  from:req.body.email,
  to: 'okyereamponsah78@gmail.com',
  subject: `Message from ${req.body.email}: ${req.body.subject}`,
  text: req.body.message
}
//sendMail
transporter.sendMail(mailOption, (error, info)=>{
  if(error){
    console.log(error);res.send('error');
  }
  else{
    console.log('Email sent: ' + info.response);
    res.send('success');
  }
})


})





app.listen(4000, () =>{
  console.log('Running Server at port 4000');

});

