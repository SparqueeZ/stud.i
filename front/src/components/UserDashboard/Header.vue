<template>
  <header class="header-wrapper">
    <div class="page-infos-wrapper">
      <Icon name="home" />
      <p class="page-infos">{{ pageName }}</p>
    </div>
    <div class="profile-wrapper">
      <div class="profile-infos-wrapper">
        <p class="profile-infos">Baptiste D.</p>
        <p class="profile-role">Invité</p>
      </div>
      <div class="profile-picture-wrapper">
        <img src="../assets/img/profile_picture.png" alt="Profile Picture" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Icon from '../Icon.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
console.log(route.name)
const pageName = ref(route.name)
</script>

<style scoped lang="scss">
.header-wrapper {
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 99px;

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
    padding-right: 2rem;
    .profile-infos-wrapper {
      display: flex;
      flex-direction: column;
      align-items: end;
      .profile-infos {
        font-size: 20px;
        color: var(--color-text);
        text-transform: capitalize;
      }
      .profile-role {
        font-size: 16px;
        color: var(--color-text-secondary);
        text-transform: capitalize;
      }
    }
    .profile-picture-wrapper {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      overflow: hidden;
      background-color: var(--color-text-secondary);
      img {
        font-size: 10px;
      }
    }
  }
}
</style>
