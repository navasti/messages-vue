import './assets/main.css'

import { i18n } from '@/locales'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(i18n)
app.use(createPinia())

app.mount('#app')
