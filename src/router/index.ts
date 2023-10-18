import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import auto from '../views/AutoPage.vue'
import manu from '../views/ManuPage.vue'
import main from '@/views/MainPage.vue'

const routes: Array<RouteRecordRaw> = [
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
    name: 'main',
    component: main
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
