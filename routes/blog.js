const express = require('express');
const passport = require('passport');
const imageUpload = require('../middleware/Multer');


const routes = express.Router();

const {blogPage,insertBlog,deleteblog,editblog,Activeblog,Deactiveblog,updateblog} = require('../controllers/BlogController');

routes.get('/blog-page',passport.checkAuthentication,blogPage)


routes.post('/insert-blog', imageUpload,insertBlog)
routes.get('/delete-blog/:_id',deleteblog)
routes.get('/edit-blog/:_id',editblog)
routes.post('/update-blog/:_id',imageUpload,updateblog)
routes.get('/Active-blog/:_id',Activeblog)
routes.get('/Deactive-blog/:_id',Deactiveblog)

module.exports = routes