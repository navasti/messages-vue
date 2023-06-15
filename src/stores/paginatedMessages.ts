import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFetchMessagesStore } from '@/stores/fetchMessages'

export const usePaginatedMessagesStore = defineStore('paginatedCommnets', () => {
  const perPage = 15
  const page = ref(1)

  const fetchMessagesStore = useFetchMessagesStore()

  const total = computed(() => fetchMessagesStore.data?.length || 0)
  const totalPages = computed(() => Math.ceil(total.value / perPage))

  const messages = computed(() => {
    const start = (page.value - 1) * perPage
    const end = start + perPage
    return (fetchMessagesStore.data || []).slice(start, end)
  })

  const nextPage = () => {
    if (page.value < total.value / perPage) {
      page.value++
    }
  }

  const prevPage = () => {
    if (page.value > 1) {
      page.value--
    }
  }

  return { page, messages, total, nextPage, prevPage, totalPages }
})
