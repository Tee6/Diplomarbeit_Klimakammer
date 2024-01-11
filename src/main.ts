/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import LoadScript from "vue-plugin-load-script";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(LoadScript);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')