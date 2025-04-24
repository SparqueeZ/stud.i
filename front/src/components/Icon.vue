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
  width: 24px;
  height: 24px;
  stroke: #d9d9d9; /* Couleur par défaut des icônes */
  fill: none; /* Assurez-vous que l'intérieur des icônes est transparent */
  transition: stroke 0.3s ease;
}

.icon svg {
  width: 100%;
  height: 100%;
}
</style>
