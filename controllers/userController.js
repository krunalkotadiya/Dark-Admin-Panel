
const yommodel =  require('../model/UserModel')

const home = async(req,res)=>{
    const data = await yommodel.find({})
    return res.render('yom', {data})
}



module.exports = {home}