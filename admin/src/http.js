import axios from 'axios'
import Vue from 'vue'
import nprogress from 'nprogress'

const http = axios.create({
    baseURL:'http://localhost:3000/api/admin'
})

http.interceptors.request.use(config=>{
    nprogress.start()
    return config
})

http.interceptors.response.use(config=>{
    nprogress.done()
    return config
},err=>{    
    nprogress.done()
    if(err.isAxiosError){
        Vue.prototype.$message.error({
            message:err.response.data.msg || '未知错误',
            center:true,
            duration:1500
        })
    }
    return err
})

export default http