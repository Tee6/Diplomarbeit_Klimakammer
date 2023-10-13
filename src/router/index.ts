import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import auto from '../views/AutoPage.vue'
import manu from '../views/ManuPage.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
