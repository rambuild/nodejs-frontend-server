import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
    baseURL:'http://localhost:3000/api/admin'
})

http.interceptors.response.use(config=>{
    return config
},err=>{
    if(err.isAxiosError){
        Vue.prototype.$message.error({
            message:err.response.data.msg,
            center:true,
            duration:1500
        })
    }
    return err
})

export default http