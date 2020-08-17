module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const assert = require('http-assert')

    // 获取列表
    router.get('/', async (req, res) => {
        let queryOptions = {}
        if (req.Model.modelName == 'Category') {
            const selCat = req.query.selCat
            // 先找出上级分类
            const parent = await req.Model.find({ name: selCat })
            // 再找出上级分类为指定名称的分类列表
            selCat ? queryOptions.where = { parent } : ''
            queryOptions.populate = 'parent'
        }
        if (req.Model.modelName == 'Hero') {
            queryOptions.populate = ['categories', 'advantageItems', 'disadvantageItems']
        }
        if (req.Model.modelName == 'Article') {
            queryOptions.populate = ['categories']
        }
        const items = await req.Model.find().setOptions(queryOptions)
        res.send({
            status: 200,
            data: items,
            msg: "获取成功"
        })
    })
    // 通过id查询
    router.get('/:id', async (req, res) => {
        const name = await req.Model.findById(req.params.id)
        res.send({
            status: 200,
            data: name,
            msg: "查询成功"
        })

    })
    // 添加
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send({
            model,
            msg: "添加成功",
            status: 200
        })
    })
    // 更新
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            status: 200,
            msg: "更新成功"
        })
    })
    // 删除分类
    router.delete('/:id', async (req, res) => {
        if (req.Model.modelName == 'AdminUser' && req.params.id == '5f1a787bf9a551345070d706') {
            return res.status(400).send({
                status: 400,
                msg: '管理员账号不允许删除',
            })
        }
        let result = await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            status: 200,
            data: result,
            msg: '删除成功',
        })
    })
    // CRUD通用接口
    app.use('/api/admin/rest/:resource', (req, res, next) => {
        let modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../db/model/${modelName}`)
        next()
    }, router)
    // 上传图片接口
    const upload = require('multer')({ dest: __dirname + "/../../uploads" })
    app.post('/api/admin/uploads', upload.single('file'), (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        file.status = 200
        res.send(file)
    })
    // 查找用户接口
    app.get('/api/admin/login', async (req, res) => {
        const { username } = req.query
        const User = require('../../db/model/AdminUser')
        const user = await User.findOne({ username })
        if (user) {
            res.send({ status: 200, user: user.username })
        } else {
            res.send({ status: 404 })
        }
    })
    // 登录接口
    app.post('/api/admin/login', async (req, res) => {
        const { username, password } = req.body
        const User = require('../../db/model/AdminUser')
        const user = await User.findOne({ username }).select('+password')
        console.log(req)
        if (!user) {
            return res.status(404).send({
                status: 404,
                msg: `未找到用户:${username}`
            })
        } else {
            const isValid = require('bcrypt').compareSync(password, user.password)
            if (!isValid) {
                return res.status(400).send({
                    status: 400,
                    msg: "用户名或密码错误"
                })
            } else {
                const jwt = require('jsonwebtoken')
                const payload = {
                    id: user._id,
                    username: user.username,
                    exp: Date.now() + (1000 * 60 * 60 * 24)
                }
                const token = jwt.sign(payload, app.get('jwtSecret'))
                res.send({
                    status: 200,
                    msg: '登陆成功',
                    user: user.username,
                    token: 'Bearer ' + token
                })
            }
        }
    })
    // app.use(async(err,req,res,next)=>{
    //     if(err){
    //         res.status(err.statusCode).send({
    //             msg:err.message
    //         })
    //     }
    // })
    // app.all('/api/admin/*',(req,res,next)=>{
    //     if(!req.headers.authorization){
    //         return res.send({
    //             status:400,
    //             msg:'无效token'
    //         })
    //     }else{
    //         next()
    //     }
    // })
}