module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const categoriesModel = require('../../db/model/Categories')
    // 添加
    router.post('/categories/add', async (req, res) => {
        const model = await categoriesModel.create(req.body)
        res.send({ model })
    })
    // 更新
    router.put('/categories/:id', async (req, res) => {
        const model = await categoriesModel.findByIdAndUpdate(req.params.id,req.body)
        res.send({ status:200 })
    })
    // 获取列表
    router.get('/categories/list', async (req, res) => {
        const items = await categoriesModel.find()
        res.send({ data: items })
    })
    // 通过id查询
    router.get('/categories/:id', async (req, res) => {
        let id = req.params.id
        const name = await categoriesModel.findById(id)
        res.send({ data: name })
    })

    app.use('/api/admin', router)
}