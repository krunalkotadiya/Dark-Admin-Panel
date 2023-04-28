const express = require("express");
const passport = require('passport')

const routes = express.Router()

const {home} = require('../controllers/userController')


routes.get('/',home);

module.exports = routes;