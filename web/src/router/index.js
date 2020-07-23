import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/main'),
      children: [{
        path: '/',
        component: () => import('@/views/home')
      }]
    }
  ]
})
export default router