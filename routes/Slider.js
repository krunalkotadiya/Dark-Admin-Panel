const express =  require('express');
const passport = require('passport');
const imageUpload = require('../middleware/Multer');

const routes = express.Router();

const {slider,insertData,deleteData,editData,Active,Deactive,updateData} = require('../controllers/sliderController');

//page-Routers

routes.get('/slider',slider);

//Data-Routers

routes.post('/insertData',imageUpload,insertData);
routes.get('/delete/:_id',deleteData)
routes.get('/edit/:_id',editData)
routes.post('/updateData/:_id',imageUpload,updateData)
routes.get('/Active/:_id',Active)
routes.get('/Deactive/:_id',Deactive)


module.exports = routes