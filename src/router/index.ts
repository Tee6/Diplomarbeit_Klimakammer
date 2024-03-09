import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import auto from '@/views/AutoPage.vue'
import manu from '@/views/ManuPage.vue'
import Home from '@/views/MainPage.vue'
import liveweather from '@/views/LiveWeatherPage.vue'
import settings from '@/views/SettingsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
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
  },
  {
    path: '/liveweather',
    name: 'liveweather',
    component: liveweather
  },
  {
    path: '/settings',
    name: 'settings',
    component: settings
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
