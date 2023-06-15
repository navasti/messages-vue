<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import { CommentRendering, Language } from '@/types'
import { SettingsIcon } from '@/components/icons'
import { ModalWindow } from '@/components'
import { translate } from '@/locales'
import { ref } from 'vue'

const settings = useSettingsStore()
const showModal = ref(false)
</script>

<template>
  <SettingsIcon class="settings-icon" @click="showModal = true" />
  <Teleport to="body">
    <ModalWindow :show="showModal" @close="showModal = false">
      <template #title>{{ translate('settings') }}</template>
      <template #body>
        <div>{{ translate('selectedLanguage') }} - {{ translate(`${settings.language}`) }}</div>
        <div>
          {{ translate('selectedRendering') }} - {{ translate(`${settings.commentRendering}`) }}
        </div>
        <div class="buttons">
          <button @click="settings.setCommentRendering(CommentRendering.infinite)">
            {{ translate('selectInfiniteScrollRendering') }}
          </button>
          <button @click="settings.setCommentRendering(CommentRendering.pagination)">
            {{ translate('selectPaginationRendering') }}
          </button>
          <button @click="settings.setLanguage(Language.pl)">
            {{ translate('selectPolishLanguage') }}
          </button>
          <button @click="settings.setLanguage(Language.en)">
            {{ translate('selectEnglishLanguage') }}
          </button>
        </div>
      </template>
    </ModalWindow>
  </Teleport>
</template>

<style scoped>
.settings-icon {
  height: 40px;
  cursor: pointer;
}
.buttons {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
button {
  background-color: #363a3d;
  border-radius: 10px;
  color: #fff;
  margin: 5px 0;
  padding: 5px;
}
</style>
