import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        },
        {
          path: '/movies',
          name: 'movies',
          component: () => import(/* webpackChunkName: "demo" */ './views/ListMovie')
        },
        {
          path: '/actors',
          name: 'actors',
          component: () => import(/* webpackChunkName: "demo" */ './views/ListActor')
        },
        {
          path: '/genres',
          name: 'genres',
          component: () => import(/* webpackChunkName: "demo" */ './views/ListGenre')
        },
        {
          path: '/users',
          name: 'users',
          component: () => import(/* webpackChunkName: "demo" */ './views/ListUser')
        },
        {
          path: '/countrys',
          name: 'countrys',
          component: () => import(/* webpackChunkName: "demo" */ './views/ListCountry')
        },
        {
          path: '/directors',
          name: 'directors',
          component: () => import(/* webpackChunkName: "demo" */ './views/ListDirector')
        },
        {
          path: '/userroles',
          name: 'user-roles',
          component: () => import(/* webpackChunkName: "demo" */ './views/ListUserRole')
        },
        {
          path: '/moviedetail/:slug',
          name: 'movies-detail',
          component: () => import(/* webpackChunkName: "demo" */ './views/MovieDetail'),
          props: true,

        },

      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
})
