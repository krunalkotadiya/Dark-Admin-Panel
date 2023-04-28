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
        fs.unlinkSync(deleteData.avtar)
        await res.redirect('back');

    } catch (error) {
        console.log(error);
        res.redirect('back');
    }
}

const editData = async(req,res)=>{
    try {
        const {params : {_id} } = req
        const data = await sliderModel.findById({_id})
        res.render('yom_slider_update' , {data})
    } catch (error) {
        console.log(error);
        res.redirect('back');
    }
}

const updateData = async(req,res) =>{
    try {
        const {params : {_id} } = req ; 
        if(req.file){
            const img = `${imgPath}/${req.file.filename}`
            const dataupdate =  await sliderModel.findByIdAndUpdate(_id , Object.assign({avtar : img } , req.body));
            if(dataupdate){
                fs.unlinkSync(dataupdate.avtar)
            }
            res.redirect('/slider')
        }else{
            const obj = req.body ; 
            const data =  await sliderModel.findByIdAndUpdate(_id ,obj)
            if(data){
                return res.redirect('/slider')
            }
        }
    } catch (error) {
            console.log(error);
            return res.redirect('back');
    }
}

const Active = async (req, res) => {
    try {
        const { params: { _id } } = req
        await sliderModel.findByIdAndUpdate(_id, {
            status: '0'
        })
        res.redirect('back')
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const Deactive = async (req, res) => {
    try {
        const { params: { _id } } = req
        await sliderModel.findByIdAndUpdate(_id, {
            status: '1'
        })
        res.redirect('back')
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}



module.exports = {slider,insertData,deleteData,editData,Deactive,Active,updateData}

