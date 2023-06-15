<script setup lang="ts">
import { CloseIcon } from '@/components/icons'
defineProps({
  show: Boolean,
  fullPage: Boolean
})
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container" :class="fullPage ? 'full-page' : 'regular'">
        <div class="modal-header">
          <h3>
            <slot name="title"></slot>
          </h3>
          <button class="close-button" @click="$emit('close')">
            <CloseIcon class="close-icon" />
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container.full-page {
  max-width: 1280px;
  max-height: 800px;
  width: 100%;
  height: 100%;
}

.modal-container.regular {
  width: 400px;
}
.modal-container {
  margin: auto;
  border-radius: 10px;
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

@media screen and (min-width: 800px) {
  .modal-container.regular {
    width: 600px;
  }
}

@media screen and (min-width: 1440px) {
  .modal-container.regular {
    width: 750px;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  font-weight: 600;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
