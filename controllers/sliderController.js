const sliderModel = require('../model/UserModel');
const path = require('path');
const fs = require('fs');
const imgPath = path.join('uploads');
const nodemailer = require('nodemailer')


//Page Router

const slider = async(req,res)=>{
    const data = await sliderModel.find({})
    return res.render('yom_slider', {data})
}


//Data Router

const insertData = async(req,res)=>{
    console.log(req.body);
    try {
        const image = `${imgPath}/${req.file.filename}`;
        const data = await sliderModel.create(Object.assign({ avtar:image },req.body));
        if(data){
            return res.redirect('back');
        }
        console.log('Slider Added SuccessFully');
    } catch (error) {
        console.log(error);
    }
}

const deleteData = async(req,res)=>{
    try {
        const {params : {_id } } = req
        const deleteData = await sliderModel.findByIdAndDelete({_id});
        fs.utimesSync(deleteData.avtar)
        await res.redirect('back');

    } catch (error) {
        console.log(error);
        res.redirect('back');
    }
}

const editData = async(req,res)=>{
    try {
        const {params : {_id } } = req
        const data = await sliderModel.findById({_id});
        // res.render()
    } catch (error) {
        console.log(error);
        res.redirect('back');
    }
}



module.exports = {slider,insertData,deleteData,editData}

