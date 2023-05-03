const mongoose = require('mongoose');

const postschema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    avtar: {
        type: String,
        required : true
    },
    status:{
        type: String,
        default: 1
    }
})

module.exports = mongoose.model('recent-post',postschema);