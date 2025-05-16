<template>
  <header class="header-wrapper">
    <div class="page-infos-wrapper">
      <Icon :name="getPageIcon()" />
      <p class="page-infos">{{ pageName }}</p>
    </div>
    <div class="profile-wrapper">
      <div class="profile-infos-wrapper">
        <p class="profile-infos">
          {{ userStore.user.firstname }} {{ userStore.user.lastname[0] }}.
        </p>
        <p class="profile-role">{{ userStore.user.role }}</p>
      </div>
      <div class="profile-picture-wrapper">
        <p class="picture-letter">
          {{ userStore.user.firstname[0] }}{{ userStore.user.lastname[0] }}
        </p>
        <!-- <img src="../assets/img/profile_picture.png" alt="Profile Picture" /> -->
      </div>
      <div class="profile-selector">
        <Icon name="chevron" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Icon from '../lib/Icon.vue'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const route = useRoute()
const pageName = computed(() => route.name)

const getPageIcon = () => {
  switch (route.name) {
    case 'home':
      return 'home'
    case 'formation':
      return 'book'
    case 'certificat':
      return 'hat'
    case 'ressources':
      return 'folder'
    case 'ressource':
      return 'file'
    default:
      return 'home'
  }
}
</script>

<style scoped lang="scss">
.header-wrapper {
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 99px;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-background);
  width: 100%;

  .page-infos-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left: 2rem;
    .page-infos {
      font-size: 20px;
      color: var(--color-text);
      text-transform: capitalize;
    }
  }

  .profile-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 8px 16px;
    border-radius: 4px;
    margin-right: 2rem;

    .profile-infos-wrapper {
      display: flex;
      flex-direction: column;
      align-items: end;
      .profile-infos {
        font-size: 1rem;
        color: var(--color-text);
        text-transform: capitalize;
      }
      .profile-role {
        font-size: 0.8rem;
        color: var(--color-text-secondary);
        text-transform: capitalize;
      }
    }
    .profile-picture-wrapper {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      overflow: hidden;
      background-color: var(--color-text-tertiary);
      img {
        font-size: 10px;
      }
      .picture-letter {
        font-size: 20px;
        font-weight: 900;
        color: var(--color-text);
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    }
    .profile-selector {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;
      .icon {
        rotate: 270deg;
      }
    }
  }
}
</style>
