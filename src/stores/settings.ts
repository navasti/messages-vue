import { CommentRendering, Language } from '@/types'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const language = ref<Language>((localStorage.getItem('language') as Language) || Language.en)
  const commentRendering = ref<CommentRendering>(CommentRendering.pagination)

  const { locale } = useI18n()

  const setCommentRendering = (rendering: CommentRendering) => {
    commentRendering.value = rendering
  }

  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang)
    language.value = lang
    locale.value = lang
  }

  return {
    language,
    commentRendering,
    setLanguage,
    setCommentRendering
  }
})
