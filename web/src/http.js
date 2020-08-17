import axios from 'axios'
import nprogress from 'nprogress'
import Vue from 'vue'


const http = axios.create({
    baseURL: 'http://localhost:3000/api/web'
})

http.interceptors.request.use(config => {
    nprogress.start()
    return config
})
http.interceptors.response.use(config => {
    nprogress.done()
    return config
}, err => {
    nprogress.done()
    if (err.isAxiosError) {
        Vue.prototype.$message.error({
            message: err.response.data.msg || '未知错误',
            center: true,
            duration: 1500
        })
    }
    return err
})

export default http