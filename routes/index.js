const express = require('express');
const passport = require('passport')
const imageUpload = require('../middleware/Multer');

const routes = express.Router();

const {login,register,registerData,loginData,dash,logout,forgot,forgotpassword,otp,otpdata,reset,resetdata,profile,profieupdate,yom} = require('../controllers/RegController');


routes.get('/',login)
routes.get('/register',register)
routes.get('/dash',passport.checkAuthentication,dash)
routes.get('/forgot',forgot)
routes.get('/logout',logout)
routes.get('/otp',otp)
routes.get('/reset',reset)
routes.get('/profile',profile)
routes.get('/yom',yom)


routes.post('/registerData',registerData)
routes.post('/loginData',passport.authenticate('local', { failureRedirect: "/" }),loginData)
routes.post('/forgot-password',forgotpassword)
routes.post('/otp-data',otpdata)
routes.post('/reset-data',resetdata)
routes.post('/profile-update',imageUpload,profieupdate)


module.exports = routes;