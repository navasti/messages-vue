import type { Message } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFetchMessagesStore = defineStore('fetchMessages', () => {
  const data = ref<null | Message[]>(null)
  const error = ref<null | string>(null)
  const loading = ref(false)

  const fetchMessages = async () => {
    let fetchedMessages: Message[] | null = null
    try {
      loading.value = true
      const { default: messagesData } = await import('../data/messages.json')
      fetchedMessages = messagesData as Message[]
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      setTimeout(() => {
        data.value = fetchedMessages
        loading.value = false
      }, 1500)
    }
  }

  return { data, loading, error, fetchMessages }
})
