<template>
  <section class="card-wrapper">
    <div class="header-wrapper">
      <slot name="header" />
    </div>
    <div class="content-wrapper">
      <slot name="content" />
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.card-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  .header-wrapper {
    display: flex;
    padding: 0 16px;
    align-items: center;
    min-height: 60px;
    border-bottom: 1px solid var(--color-border);
  }
}
</style>
