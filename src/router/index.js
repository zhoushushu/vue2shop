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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
