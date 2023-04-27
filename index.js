const express = require('express');
const app = express();
const path = require('path');
const port = 9000;
const cookie = require('cookie-parser')
const passport = require('passport');
const passportLocal = require('./config/Passport-local');
const session = require('express-session');
const db = require('./config/mongoose')
const connect_mongo = require('connect-mongo')

app.use('/uploads', express.static(path.join('uploads')))

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public/user')));
app.use(cookie())



app.use(session({
    secret: 'Krunal',
    resave: true,
    store : new connect_mongo({
        mongoUrl : "mongodb://127.0.0.1:27017/Admin_Panel",
        collectionName : "sessions"
    }),
    saveUninitialized: true,
        cookie : {
            maxAge : 1000*60*60
        }
  }));


  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passport.setAuthentication); 





app.use('/',require('./routes'));
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log('Server Started On Port : '+ port);
});
