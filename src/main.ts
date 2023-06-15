import './assets/main.css'

import { createI18n } from 'vue-i18n'
import { messages } from '@/locales'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const i18n = createI18n({
  locale: localStorage.getItem('language') || 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages
})

const app = createApp(App)

app.use(i18n)
app.use(createPinia())

app.mount('#app')
