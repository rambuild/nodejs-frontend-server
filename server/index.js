const express = require('express')
const mongoose = require('./db/index')
const cors = require('cors')
const app = express()

// 跨域中间件
app.use(cors())

// jwt密钥
app.set('jwtSecret','rambuild')

// bodyParser中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

// 静态资源
app.use('/uploads',express.static(__dirname + '/uploads'))

// 引入admin后台路由
require('./routes/admin/index')(app)


























app.listen(3000,(err)=>{
    if(err){
        return console.log(err)
    }
    console.log('Project listen at: http://localhost:3000！')
})