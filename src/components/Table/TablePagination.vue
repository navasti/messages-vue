<script setup lang="ts">
import { RightArrowIcon, LeftArrowIcon } from '@/components/icons'
import { translate } from '@/locales'
defineProps({
  nextPage: {
    type: Function,
    default: () => {}
  },
  prevPage: {
    type: Function,
    default: () => {}
  },
  totalPages: Number,
  page: Number
})
</script>

<template>
  <div class="pagination">
    <button class="prev-button" @click="prevPage()">
      <LeftArrowIcon class="prev-icon" />
    </button>
    <span class="page-number">{{ page }} {{ translate('of') }} {{ totalPages }}</span>
    <button class="next-button">
      <RightArrowIcon class="next-icon" @click="nextPage()" />
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  justify-content: end;
}
</style>
