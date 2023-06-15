<script setup lang="ts">
import { AttachmentMailIcon, MailIcon, EyeIcon } from '@/components/icons'
import { ModalWindow } from '@/components'
import { type PropType, ref } from 'vue'
import type { Message } from '@/types'
defineProps({
  message: {
    type: Object as PropType<Message>,
    required: true
  }
})

const showModal = ref(false)
</script>

<template>
  <tr>
    <td>
      <AttachmentMailIcon v-if="message.type === 'message-with-attachment'" />
      <MailIcon v-else />
    </td>
    <td>{{ message.title }}</td>
    <td>{{ message.date }}</td>
    <td>{{ message.sender }}</td>
    <td class="utility-icons">
      <EyeIcon class="eye-icon" @click="showModal = true" />
    </td>
  </tr>
  <Teleport to="body">
    <ModalWindow :show="showModal" @close="showModal = false">
      <template #title>{{ message.title }}</template>
      <template #body> {{ message.content }}</template>
    </ModalWindow>
  </Teleport>
</template>

<style scoped>
.utility-icons {
  display: flex;
  justify-content: end;
}

tr:nth-of-type(even) {
  background-color: #f7f6f6;
}

tr:last-child {
  border-bottom: 0;
}

tr {
  border-bottom: 1px solid #dddddd;
}

.eye-icon {
  cursor: pointer;
}

td {
  padding: 12px 15px;
}
</style>
