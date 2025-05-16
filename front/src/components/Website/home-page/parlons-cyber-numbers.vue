<template>
  <section class="parlons-cyber-numbers-container">
    <div class="pcn-content">
      <article class="number-card" v-for="(item, index) in numbers" :key="index">
        <Icon :name="item.icon" class="icon" />
        <div class="text">
          <h3>{{ item.number }}</h3>
          <p>{{ item.title }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '@/components/lib/Icon.vue'

const numbers = ref([
  {
    id: 0,
    icon: 'bigYoutube',
    title: 'abonnés sur Youtube',
    number: '+15k',
  },
  {
    id: 1,
    icon: 'bigLinkedIn',
    title: 'abonnés sur LinkedIn',
    number: '+10k',
  },
  {
    id: 2,
    icon: 'bigLike',
    title: 'likes cummulés',
    number: '+7k',
  },
])
</script>

<style scoped lang="scss">
.parlons-cyber-numbers-container {
  padding: 5rem 0;
  .pcn-content {
    display: flex;
    justify-content: center;
    gap: 10%;
    .number-card {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      .icon {
        display: flex;
        align-items: center;
        height: 7rem;
        aspect-ratio: 1/1;
        fill: #e5e5e5;
      }
      .text {
        display: flex;
        flex-direction: column;
        h3 {
          font-size: 4rem;
          font-weight: 800;
          color: #e5e5e5;
          line-height: 4rem;
        }
        p {
          font-size: 1rem;
          color: #e5e5e5;
        }
      }
    }
  }
}
</style>
