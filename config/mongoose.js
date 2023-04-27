const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://127.0.0.1/Admin_Panel');

db ? console.log('DB Started') : console.log('DB Not Started');

module.exports = db ;