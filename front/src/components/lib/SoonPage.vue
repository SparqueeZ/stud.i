<template>
  <section class="soon-wrapper">
    <div class="soon-content">
      <h1>Page en construction</h1>
      <p>Cette page est en cours de développement. Revenez plus tard !</p>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.soon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 20px);
  background-color: var(--color-background);
  .soon-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    h1 {
      font-size: 1.5rem;
      color: var(--color-text);
      margin-bottom: 1rem;
    }
    p {
      font-size: 0.8rem;
      color: var(--color-text);
    }
  }
}
</style>
