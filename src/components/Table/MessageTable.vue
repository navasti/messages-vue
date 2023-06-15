<script setup lang="ts">
import { TableRow } from '@/components/Table'
import { RippleLoader } from '@/components'
import type { Message } from '@/types'
import { type PropType } from 'vue'
import { translate } from '@/locales'

const columnHeads = ['Type', 'Name', 'Date', 'Sender']

defineProps({
  messages: Array as PropType<Message[]>,
  isLoading: Boolean,
  total: Number,
  page: Number,
  currentlyDisplayed: {
    type: Number,
    required: false
  }
})
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th
          :key="columnHead"
          v-for="(columnHead, index) in columnHeads"
          :colspan="columnHeads.length - 1 === index ? 2 : 1"
        >
          {{ translate(columnHead.toLocaleLowerCase()) }}
        </th>
      </tr>
    </thead>

    <tbody v-if="isLoading">
      <tr>
        <td colspan="5" class="loading-td">
          <RippleLoader />
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <TableRow v-for="message in messages" :key="message.id" :message="message" />
    </tbody>
    <tfoot>
      <tr>
        <td colspan="5">
          <span v-if="currentlyDisplayed" class="displayed-info"
            >{{ translate('displayed') }}: {{ currentlyDisplayed }},</span
          >
          <span>{{ translate('totalMessages') }}: {{ total }}</span>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped>
.table {
  border-collapse: collapse;
  border-spacing: 1;
  border-radius: 6px;
  width: 100%;
  overflow: hidden;
  font-family: sans-serif;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.loading-td {
  text-align: center;
}

.table thead tr {
  border-radius: 10px;
  border-bottom: 1px solid #e3f1d5;
  background-color: #363a3d;
  color: #ffffff;
  text-align: left;
}

.displayed-info {
  margin-right: 10px;
}

.table th {
  padding: 12px 15px;
}

.table tfoot {
  background-color: #363a3d;
}

.table tfoot td {
  padding: 12px 15px;
  color: #ffffff;
}
</style>
