const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/webAdmin', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('数据库连接成功！')
})

module.exports = mongoose