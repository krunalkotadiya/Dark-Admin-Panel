const express = require('express');

const routes = express.Router();
const passport = require('passport')

const imageUpload = require('../middleware/Multer')

const {recentpage,postinsert,deletepost,editpost,activepost,deactivepost,updatepost} = require('../controllers/ResentPostController');

routes.get('/recent-post',passport.checkAuthentication,recentpage);


routes.post('/recent-post-insert',imageUpload,postinsert)
routes.get('/delete-post/:_id',deletepost)
routes.get('/edit-post/:_id',editpost)
routes.post('/update-post/:_id',updatepost)
routes.get('/Active-post/:_id',activepost)
routes.get('/Deactive-post/:_id',deactivepost)

module.exports = routes