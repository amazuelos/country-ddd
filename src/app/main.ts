import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from '../ui/layouts/MainLayout.vue'
import '../styles/index.css'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')