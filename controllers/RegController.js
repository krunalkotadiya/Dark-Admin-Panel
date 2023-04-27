const Amodel = require('../model/AdminModel');
const path =  require('path');
const nodemailer = require('nodemailer')
const fs = require('fs');
const imagePath = path.join('uploads')


const login = (req,res)=>{
    if(res.locals.finduser){
        return res.redirect('/dash')
    }
    return res.render('login')
}

const register = (req,res)=>{
    res.render('register')
}

const dash = (req,res)=>{
    return res.render('index')
}

const forgot = (req,res)=>{
    return res.render('forgot')
}

const otp = (req,res)=>{
    return res.render('otp')
}

const reset = (req,res)=>{
    return res.render('reset')
}

const profile = (req,res)=>{
    return res.render('profile')
}

const yom = (req,res)=>{
    return res.render('yom')
}


const registerData = async (req,res) => {
    try{
        
        let user = await Amodel.create(req.body);
        if(user){
            console.log("user successfully create");
            return res.redirect('/');
        }else{
            console.log("user unsuccessfully create");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const loginData = (req,res)=>{
    try {
        return res.redirect('/dash')
    } catch (error) {
        console.log(error);
    }
}

const logout = (req,res)=>{
    req.logout((error)=>{
        if(error){
            console.log(error);
        }
        return res.redirect('/')
    })
   
}

const forgotpassword = async(req,res)=>{

    try {

        const email = req.body.email
        const forgotdata = await Amodel.findOne({email})
        const id = forgotdata.id

        if(!forgotdata){
            console.log('Email Id Not Found');
            return false;
        }else{
            const otp = Math.floor(Math.random() * 8000+50000)
            const obj = {id,email,otp}

            const transpoter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: "krunal7765@gmail.com",
                    pass: "fhtjosuufzycujbx"
                }
            });

            let mailoptions = {
                from: "krunal7765@gmail.com",
                to: email,
                subject: "For Reset Your Password Mail Form DARK Admin",
                text: `Your One Time Password(OTP) is :- ${otp}`,
            };

            transpoter.sendMail(mailoptions, (err, info) => {
                if (err) {
                    console.log(err.message);
                } else {
                    res.cookie("OTP", obj);
                    console.log(`Email Sent Successfully To ${email}_${info.response}`);
                    return res.redirect("/otp");
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.redirect('back');
    }
}

const otpdata = async(req,res)=>{
    try {
        if(req.body.otp == req.cookies.OTP.otp){
            res.cookie('check_otp',req.body.otp)
        }
        return res.redirect('/reset')
    } catch (error) {
        console.log('Data Not Fetch at OTP');
        res.redirect('back');
    }
}

const resetdata = async(req,res)=>{
    try {
        const id = req.cookies.OTP.id;
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if(password == cpassword){
            const resetpw = await Amodel.findByIdAndUpdate(id,{ password });

            if(resetpw){
                res.clearCookie("OTP");
                res.clearCookie("check_otp");
                console.log("Password Update Successfully");
                return res.redirect("/");
            }else{
                return res.redirect("back");
            }
        }

    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}

const profieupdate = async (req,res) =>{
    try {
        const id  =  res.locals.user._id
        if(req.file){
            const img = `${imagePath}/${req.file.filename}`;
            const updateData = await Amodel.findByIdAndUpdate(id,Object.assign({avtar : img}),req.body)
            if(updateData){
                if(updateData.avtar !== 'uploads/pexels-sindre-fs-1040880.jpg'){
                    fs.unlinkSync(updateData.avtar)
                }
            }
            return res.redirect('/dash')
        }else{
            const oldImage = res.locals.user.avtar
            console.log(id);
            const updateOld = await Amodel.findByIdAndUpdate(id, Object.assign({ avtar: oldImage }, req.body))
            if (updateOld) {
                return res.redirect('/dash')
            }
        }
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}



module.exports = {login,register,registerData,loginData,dash,logout,forgot,forgotpassword,otp,otpdata,reset,resetdata,profile,profieupdate,yom}