const mongoose = require('mongoose')

mongoose.connect('mongodb://fyh:qwer1236@106.55.157.112:27017/LOLMobile?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (err) => {
    console.log('error:',err)
})
db.once('open', () => {
    console.log('数据库连接成功！')
})

module.exports = mongoose