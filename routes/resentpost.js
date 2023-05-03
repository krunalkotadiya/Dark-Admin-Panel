const express = require('express');

const routes = express.Router();
const passport = require('passport')

const imageUpload = require('../middleware/Multer')

const {recentpage,postinsert,deletepost,editpost,activepost,deactivepost} = require('../controllers/ResentPostController');

routes.get('/recent-post',passport.checkAuthentication,recentpage);


routes.post('/recent-post-insert',imageUpload,postinsert)
routes.get('/delete-post/:_id',deletepost)
routes.get('/editpost/:_id',editpost)
routes.get('/Active-post/:_id',activepost)
routes.get('/Deactive-post/:_id',deactivepost)

module.exports = routes