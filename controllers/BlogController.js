const model = require('../model/BlogModel');
const path = require('path');
const fs = require('fs');
const imgPath = path.join('uploads');

const blogPage = async(req,res)=>{

    try {
        const data = await model.find({});
        if(data){
            return res.render('blog-page', {data});
        }
        
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }

}

const insertBlog = async(req,res)=>{
    try {
        const img = `${imgPath}/${req.file.filename}`
        const blogadd = await model.create(Object.assign({avtar : img}, req.body));

        if(blogadd){
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}

const deleteblog = async(req,res)=>{
    try {
        const {params : {_id} } = req
        const deleteblog = await model.findByIdAndDelete({_id})
        fs.unlinkSync(deleteblog.avtar)
        await res.redirect('back');
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}

const editblog = async(req,res)=>{
    try {
        const {params : {_id} } = req ;
        const data = await model.findById({_id})
        await res.render('blog_update',{data}) 
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}

const updateblog = async(req,res)=>{
    try {
        const {params : {_id} } = req

        if(req.file){
            const img = `${imgPath}/${req.file.filename}`
            const updatedata = await model.findByIdAndUpdate(_id , Object.assign({avtar : img} , req.body));

            if(updatedata){
                fs.unlinkSync(updatedata.avtar)
            }
            return res.redirect('/blog-page')

        }else{
            const obj = req.body
            const data = await model.findByIdAndUpdate(_id , obj)
            if(data){
                return res.redirect('/blog-page')
            }
        }

    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}

const Activeblog = async(req,res)=>{
    try {
        const {params : {_id} } = req
        await model.findByIdAndUpdate(_id , {
            status : '0'
        })
        res.redirect('back')
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}

const Deactiveblog = async(req,res)=>{
    try {
        const {params : {_id} } = req
        await model.findByIdAndUpdate(_id , {
            status : '1'
        })
        res.redirect('back')
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}

module.exports = {blogPage,insertBlog,deleteblog,editblog,Activeblog,Deactiveblog,updateblog}