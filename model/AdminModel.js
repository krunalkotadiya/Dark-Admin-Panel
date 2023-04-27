const mongoose = require('mongoose');

const schema = mongoose.Schema({

    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },

    avtar : {
        type : String,
        default : "uploads/pexels-sindre-fs-1040880.jpg"
    }
})

const admin = mongoose.model('admin',schema);
module.exports = admin ;