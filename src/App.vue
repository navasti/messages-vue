<script setup lang="ts">
import {
  usePaginatedMessagesStore,
  useInfiniteMessagesStore,
  useFetchMessagesStore,
  useSettingsStore
} from '@/stores'
import { MessageTable, TablePagination } from '@/components/Table'
import { AppSettings, MessageSearcher } from '@/components'
import { MessagesLogoIcon } from '@/components/icons'
import { CommentRendering } from '@/types'
import { translate } from '@/locales'
import { onMounted } from 'vue'

const paginatedMessagesStore = usePaginatedMessagesStore()
const infiniteMessagesStore = useInfiniteMessagesStore()
const fetchMessagesStore = useFetchMessagesStore()
const settingsStore = useSettingsStore()

onMounted(() => fetchMessagesStore.fetchMessages())
</script>

<template>
  <header class="app-header">
    <div class="logo">
      <MessagesLogoIcon class="logo" />
      <h1 class="title">{{ translate('messages') }}</h1>
    </div>
    <div class="utility-icons">
      <MessageSearcher />
      <AppSettings />
    </div>
  </header>

  <div class="messages">
    <template v-if="settingsStore.commentRendering === CommentRendering.pagination">
      <TablePagination
        :page="paginatedMessagesStore.page"
        :nextPage="paginatedMessagesStore.nextPage"
        :prevPage="paginatedMessagesStore.prevPage"
        :totalPages="paginatedMessagesStore.totalPages"
      />
      <div class="messages-table">
        <MessageTable
          :messages="paginatedMessagesStore.messages"
          :isLoading="fetchMessagesStore.loading"
          :total="paginatedMessagesStore.total"
        />
      </div>
    </template>
    <template v-if="settingsStore.commentRendering === CommentRendering.infinite">
      <div class="messages-table">
        <MessageTable
          :currentlyDisplayed="infiniteMessagesStore.currentlyDisplayed"
          :messages="infiniteMessagesStore.messages"
          :isLoading="fetchMessagesStore.loading"
          :total="infiniteMessagesStore.total"
        />
      </div>
      <button
        @click="infiniteMessagesStore.loadMoreMessages()"
        v-show="!fetchMessagesStore.loading"
        class="load-data-button"
      >
        <span>{{ translate('loadMoreData') }}</span>
      </button>
    </template>
  </div>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
}
.app-header {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  display: flex;
}
.utility-icons {
  display: flex;
  align-items: center;
}
.messages {
  display: flex;
  flex-direction: column;
}
.messages-table {
  overflow-y: auto;
}
.logo {
  margin-right: 10px;
}
.load-data-button {
  margin-top: 10px;
  padding: 12px 20px;
  width: 200px;
  align-self: center;
  border-radius: 10px;
  border: 1px solid #ccc;
  color: #fff;
  background-color: #cbcbcb;
}

.load-data-button span {
  color: #000;
}
</style>
