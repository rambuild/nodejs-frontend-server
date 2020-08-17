// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

import axios from './http'
Vue.prototype.$http = axios

// 自定义card组件
import Card from '@/components/card'
import listCard from '@/components/listCard'
Vue.component('m-card',Card)
Vue.component('m-list-card',listCard)

import 'swiper/swiper-bundle.css'
// iconfont
import '@/assets/iconfont/iconfont.css'
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
// 引入初始化scss
import './assets/css/style.scss'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
