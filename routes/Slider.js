const express =  require('express');
const passport = require('passport');
const imageUpload = require('../middleware/Multer');

const routes = express.Router();

const {slider,insertData,deleteData,editData} = require('../controllers/sliderController');

//page-Routers

routes.get('/slider',slider);

//Data-Routers

routes.post('/insertData',imageUpload,insertData);
routes.get('/delete/:_id',deleteData)
routes.get('/edit/:_id',editData)

module.exports = routes