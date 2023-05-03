const express = require("express");
const passport = require('passport')

const routes = express.Router()

const {home,blogspage,contact,getcontact} = require('../controllers/userController')


routes.get('/',home);
routes.get('/blog-single/:_id',blogspage)
routes.get('/contact',contact)
routes.post('/contact-send',getcontact)

module.exports = routes;