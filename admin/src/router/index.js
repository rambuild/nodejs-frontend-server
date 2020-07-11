import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/home'),
      children: [
        {
          path: '/categories/create',
          component: () => import("@/views/categories/create")
        },
        {
          path: '/categories/create/:id',
          component: () => import("@/views/categories/create"),
          props:true
        }, {
          path: '/categories/list',
          component: () => import('@/views/categories/list')
        }
      ]
    }
  ]
})
