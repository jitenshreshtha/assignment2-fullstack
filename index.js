const express = require('express');
require('dotenv').config();
const ejs= require('ejs');
const path = require('path');
const mongoose= require('mongoose');

// importing port number from .env file
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// importing routes
const userRoutes = require('./routes/userRoutes');

// creating instance of the server
const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

// Routes
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/users',userRoutes);


// connecting to the database
mongoose.connect(DATABASE_URL).then(()=>{
    console.log('Mongodb connected successfully');
}).catch((err)=>{
    console.log('MongoDB connection error:', err);
})

// creating endpoints 
app.get('/login',(req,res)=>{
    res.render('pages/login');
  })
  app.get('/g2',(req,res)=>{
    res.render('pages/g2');
  })
app.get('/g',(req,res)=>{
    res.render('pages/g');
})
app.get('/',(req,res)=>{
    res.render('pages/index');
})
app.get('*',(req,res)=>{
    res.send('The page is not found');
})
app.listen(PORT,()=>{
    console.log(`server created at ${PORT}`);
})