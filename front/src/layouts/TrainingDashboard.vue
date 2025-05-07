<template>
  <main class="dashboard-wrapper">
    <Sidebar />
    <div class="dashboard-content">
      <Header />
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
import Sidebar from '@/components/TrainingDashboard/Sidebar.vue'
import Header from '@/components/UserDashboard/Header.vue'
</script>

<style scoped lang="scss">
.dashboard-wrapper {
  display: flex;
  background-color: var(--color-background);
  padding: 10px 10px 10px 0;
  max-height: calc(100svh - 20px);
  overflow: hidden;
  .sidebar-wrapper {
    max-width: 240px;
    max-height: calc(100vh - 20px);
  }
  .dashboard-content {
    border: 1px solid var(--color-border);
    border-radius: 10px;
    min-height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: calc(100vh - 20px);
    overflow: auto;
  }
}
</style>
