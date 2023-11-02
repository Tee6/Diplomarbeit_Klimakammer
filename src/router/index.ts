import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import auto from '../views/AutoPage.vue'
import manu from '../views/ManuPage.vue'
import Home from '@/views/MainPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/auto',
    name: 'auto',
    component: auto
  },
  {
    path: '/manu',
    name: 'manu',
    component: manu
  },
  {
    path: '/main',
    name: 'home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
