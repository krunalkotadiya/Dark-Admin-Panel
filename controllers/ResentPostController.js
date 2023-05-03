const model = require('../model/ResentPostModel');
const path = require('path');
const fs = require('fs')
const imagPath = path.join('uploads');

const recentpage = async (req, res) => {
    try {
        const data = await model.find({})
        if (data) {
            await res.render('recent-post', { data })
        }
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}

const postinsert = async (req, res) => {
    try {
        const img = `${imagPath}/${req.file.filename}`
        const postadd = await model.create(Object.assign({ avtar: img }, req.body));

        if (postadd) {
            return res.redirect('back');
        }

    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}

const deletepost = async (req, res) => {
    try {
        const { params: { _id } } = req
        const postdelete = await model.findByIdAndDelete({ _id })
        fs.unlinkSync(postdelete.avtar);
        await res.redirect('back');
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}

const editpost = async (req, res) => {
    try {
        const { params: { _id } } = req
        const data = await model.findById({ _id });
        res.render('post_update', { data });
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}

const updatepost = async (req, res) => {
    try {
        const { params: { _id } } = req
        if (req.file) {

            const img = `${imagPath}/${req.file.filename}`
            const updatedata = await model.findByIdAndUpdate({ avtar: img }, req.body)

            if (updatedata) {

                fs.unlinkSync(updatedata.avtar)

            }
            return res.redirect('/recent-post')
        }else{

            const obj = req.body
            const data = await model.findByIdAndUpdate(_id , obj)
            if(data){
                return res.redirect('/recent-post')
            }

        }

    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}

const activepost = async (req, res) => {
    try {
        const { params: { _id } } = req
        await model.findByIdAndUpdate(_id, {
            status: '0'
        })
        res.redirect('back')
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}

const deactivepost = async (req, res) => {
    try {
        const { params: { _id } } = req
        await model.findByIdAndUpdate(_id, {
            status: '1'
        })
        res.redirect('back')
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}


module.exports = { recentpage, postinsert, deletepost, editpost, activepost, deactivepost, updatepost }