import { useFetchMessagesStore } from '@/stores/fetchMessages'
import type { Message } from '@/types'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useInfiniteMessagesStore = defineStore('infiniteCommnets', () => {
  const fetchMessagesStore = useFetchMessagesStore()
  const messages = ref<Message[]>([])
  const iteration = ref(1)
  const perIteration = 15

  fetchMessagesStore.$subscribe((_mutation, state) => {
    if (state.data && !messages.value.length) {
      messages.value = state.data.slice(0, perIteration)
    }
  })

  const total = computed(() => fetchMessagesStore.data?.length || 0)
  const currentlyDisplayed = computed(() => messages.value?.length || 0)

  const isFetchable = computed(
    () => (messages.value?.length || 0) < (fetchMessagesStore.data?.length || 0)
  )

  const loadMoreMessages = () => {
    if (fetchMessagesStore.data && messages.value && isFetchable.value) {
      const start = iteration.value * perIteration
      const end = start + perIteration
      messages.value = [...messages.value, ...fetchMessagesStore.data.slice(start, end)]
      iteration.value++
    }
  }

  return { messages, total, currentlyDisplayed, loadMoreMessages }
})
