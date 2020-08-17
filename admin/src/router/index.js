import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/login'),
      meta: { isPublic: true }
    },
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
          props: true
        }, {
          path: '/categories/list',
          component: () => import('@/views/categories/list')
        },

        {
          path: '/items/create',
          component: () => import("@/views/items/create")
        },
        {
          path: '/items/create/:id',
          component: () => import("@/views/items/create"),
          props: true
        }, {
          path: '/items/list',
          component: () => import('@/views/items/list')
        },

        {
          path: '/heroes/create',
          component: () => import("@/views/heroes/create")
        },
        {
          path: '/heroes/create/:id',
          component: () => import("@/views/heroes/create"),
          props: true
        }, {
          path: '/heroes/list',
          component: () => import('@/views/heroes/list')
        },

        {
          path: '/articles/create',
          component: () => import("@/views/articles/create")
        },
        {
          path: '/articles/create/:id',
          component: () => import("@/views/articles/create"),
          props: true
        }, {
          path: '/articles/list',
          component: () => import('@/views/articles/list')
        },

        {
          path: '/admin_user/create',
          component: () => import("@/views/admin_user/create")
        },
        {
          path: '/admin_user/create/:id',
          component: () => import("@/views/admin_user/create"),
          props: true
        }, {
          path: '/admin_user/list',
          component: () => import('@/views/admin_user/list')
        },

        {
          path: '/carousel/create',
          component: () => import("@/views/carousel/create")
        },
        {
          path: '/carousel/create/:id',
          component: () => import("@/views/carousel/create"),
          props: true
        }, {
          path: '/carousel/list',
          component: () => import('@/views/carousel/list')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.isPublic && !sessionStorage.getItem('token')) {
    return next('/login')
  } else {
    next()
    // let { data: res } = await Vue.prototype.$http.post('/verifyToken')
    // if (res.status == 200) {
    //   next()
    // }else{
    //   Vue.prototype.$msg('error',res.msg)
    // }
  }
})

export default router
