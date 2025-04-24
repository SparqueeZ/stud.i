<template>
  <div class="input-wrapper">
    <div class="icon">
      <Icon :name="icon" />
    </div>
    <div class="input">
      <input :type="type" :placeholder="placeholder" class="input-field" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: 'Enter text',
  },
  icon: {
    type: String,
    default: 'mail',
  },
})

import Icon from '@/components/Icon.vue'
</script>

<style scoped lang="scss">
.input-wrapper {
  background-color: #161618; /* Uniformiser avec le champ mot de passe */
  border-radius: 8px; /* Même bordure arrondie */
  border: 1px solid #232325;
  height: 40px; /* Uniformiser la hauteur */
  min-width: 100%; /* Uniformiser la largeur */
  display: flex;
  overflow: hidden;

  &:focus-within {
    border-color: #007bff;
    .icon {
      stroke: #d9d9d9;
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 100%;
    border-right: 1px solid #232325;
    stroke: inherit; /* Utilisez la couleur héritée de `Icon.vue` */
  }
  .input {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .input-field {
      border: none;
      outline: none;
      color: #d9d9d9;
      font-size: 16px;
      padding: 8px;
      width: 100%;
      background-color: transparent;
      &:focus {
        color: #d9d9d9;
        ::placeholder {
          color: #626164;
        }
      }
    }
  }
}
</style>
