<template>
  <transition name="popup-fade">
    <section v-if="modelValue" class="popup-wrapper" @click.self="close">
      <div class="popup-content">
        <button class="popup-close" @click="close" aria-label="Fermer">&times;</button>
        <slot />
      </div>
    </section>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function close() {
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.popup-wrapper {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.popup-content {
  background: var(--color-background, #fff);
  border-radius: 16px;
  padding: 32px 24px 24px 24px;
  min-width: 320px;
  min-height: 120px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  max-width: 90svw;
  max-height: 90svh;
  overflow: auto;
}
.popup-close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #222;
  }
}
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.2s;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}
</style>
