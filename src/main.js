import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createManager } from '@vue-youtube/core'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(createManager())
app.mount('#app')
