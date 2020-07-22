import axios from 'axios'
import Vue from 'vue'
const http = axios.create({
    baseURL: 'http://localhost:3000/api/admin'
})

http.interceptors.request.use(config => {
    if(sessionStorage.getItem('token')){
        config.headers.Authorization = sessionStorage.getItem('token').split(' ').pop()
    }
    return config
})

http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.msg) {
        Vue.prototype.$message.error({
            message: err.response.data.msg,
            duration: 1500,
            center: true
        })
    }
    return Promise.reject(err)
})

export default http