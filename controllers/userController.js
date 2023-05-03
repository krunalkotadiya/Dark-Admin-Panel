
const yommodel = require('../model/UserModel')
const postmodel = require('../model/ResentPostModel');
const blogmodel = require('../model/BlogModel')
const contactmodel = require('../model/ContactModel')

const home = async (req, res) => {
    try {
        const data = await yommodel.find({})
        const postData = await postmodel.find({})
        const blogData = await blogmodel.find({})
        return res.render('yom', { data, postData, blogData })
    } catch (error) {
        return console.log(error);
    }

}

const blogspage = async(req,res)=>{
    try {
        const {params : {_id} } = req
        console.log(_id);
        const blogData = await blogmodel.findById({_id})
        res.render('yom_blog' , {blogData});
    } catch (error) {
        return res.redirect('back');
    }
}

const contact = async(req,res)=>{
    try {
        await res.render('contact')
    } catch (error) {
        return res.redirect('back');
    }
}

const getcontact = async(req,res)=>{
    try {
        const contactdata = await contactmodel.create(req.body);

        if(contactdata) {
            return res.redirect('back');
        }

    } catch (error) {
        return res.redirect('back');
    }
}



module.exports = { home,blogspage,contact,getcontact}