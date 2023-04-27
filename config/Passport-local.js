const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const User = require('../model/AdminModel');

passport.use(new passportLocal({
    usernameField : "email"
},async(email,password,done)=>{
    let user = await User.findOne({email : email});

    if(!user || user.password != password){
        return done(null,false);
    }
    return done(null,user);
}))
passport.serializeUser((user,done)=>{
    return done(null,user._id)
});

passport.deserializeUser((_id,done)=>{ 
         User.findById(_id).then((user)=>{
            return done(null,user)
        }).catch((err)=>{
            return done(null,false);
        })
})
passport.checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');  
}

passport.setAuthentication = (req,res,next) => { 
    if(req.isAuthenticated()){
        res.locals.user = req.user 
    }
    return next();
}
module.exports = passport;