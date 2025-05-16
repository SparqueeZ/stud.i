<template>
  <span class="icon" :name="name" v-html="iconHTML"></span>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { icons } from '@/assets/js/icons.js'

const { name } = defineProps(['name'])
const iconHTML = computed(() => icons.find((icon) => icon.name === name)?.[name])
</script>

<style scoped>
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  stroke: var(--color-text); /* Couleur par défaut */
  fill: none;
  transition:
    stroke 0.3s ease,
    width 0.3s ease,
    height 0.3s ease;
}

.icon svg {
  width: 24px;
  height: 24px;
  stroke: inherit; /* Hérite de la couleur définie */
  fill: inherit; /* Hérite de la couleur définie */
}
</style>
