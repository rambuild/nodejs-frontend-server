import Vue from 'vue'

function customMessage(type, message, duration) {
    Vue.prototype.$message({
        type,
        message,
        duration: duration || 1500, // 默认1500毫秒
        center: true
    })
}

export default customMessage