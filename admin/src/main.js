// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from './http'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(ElementUI)

//所有组件都应用
Vue.mixin({
  computed: {
    uploadUrl() {
      return 'http://localhost:3000/api/admin/uploads'
    }
  },
  methods: {
    getAuthorization() {
      return {
        Authorization: `Bearer ${sessionStorage.token || ''}`
      }
    }
  }
})

// 公共scss
import '@/assets/css/common.scss'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
