const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  //物品名称
  name: {
    type: String,
    required:true
  },
  //图标
  icon: {
    type: String,
    required:true
  }
})

module.exports = mongoose.model('Item', schema)