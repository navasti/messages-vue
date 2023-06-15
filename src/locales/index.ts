import { createI18n } from 'vue-i18n'

import { en } from '@/locales/en'
import { pl } from '@/locales/pl'

export const messages = {
  en,
  pl
}

const i18n = createI18n({
  locale: localStorage.getItem('language') || 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages
})

const translate = (key: string) => {
  return i18n.global.t(key)
}

export { i18n, translate }
