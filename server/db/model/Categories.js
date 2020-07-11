const mongoose = require('../index')

const categoriesSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    }
})

module.exports = mongoose.model('category',categoriesSchema)