<script setup lang="ts">
import { useFetchMessagesStore } from '@/stores'
import { SearchIcon } from '@/components/icons'
import { MessageTable } from '@/components/Table'
import { ModalWindow } from '@/components'
import type { Message } from '@/types'
import { translate } from '@/locales'
import { debounce } from 'lodash'
import { ref } from 'vue'

const showModal = ref(false)
const foundMessages = ref<Message[]>([])
const fetchMessagesStore = useFetchMessagesStore()

const search = debounce((event: Event) => {
  const value = (event.target as HTMLInputElement).value
  if (fetchMessagesStore.data) {
    foundMessages.value = fetchMessagesStore.data.filter((message) =>
      message.title.toLowerCase().includes(value.toLowerCase())
    )
  }
}, 500)
</script>

<template>
  <SearchIcon class="search-icon" @click="showModal = true" />
  <Teleport to="body">
    <ModalWindow fullPage :show="showModal" @close="showModal = false">
      <template #title>{{ translate('search') }}</template>
      <template #body>
        <input
          type="text"
          class="search-input"
          @input="(event) => search(event)"
          :placeholder="translate('searchByName')"
        />
        <div class="messages">
          <MessageTable :messages="foundMessages" :total="foundMessages.length" />
        </div>
      </template>
    </ModalWindow>
  </Teleport>
</template>

<style scoped>
.search-icon {
  cursor: pointer;
  height: 25px;
  margin-right: 10px;
}
.messages {
  max-height: 650px;
  overflow-y: auto;
}
.search-input {
  margin-bottom: 10px;
  width: 100%;
  padding: 10px 15px;
  border-radius: 10px;
  border: 2px solid #363a3d;
}
/* ::v-deep table {
  overflow-y: auto;
} */
</style>
