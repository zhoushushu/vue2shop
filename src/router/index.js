import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register/index')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('../views/Category/index')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart/index')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/User/index')
  },
  {
    path: '/item/:id',
    name: 'item',
    component: () => import('../views/Item/index')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/Order/index')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About/index')
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('../views/Address/index')
  },
  {
    path: '/address/:type',
    name: 'addressaction',
    component: () => import('../views/Address/action')
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('../views/Info/index')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
