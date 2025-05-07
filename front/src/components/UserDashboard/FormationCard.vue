<template>
  <Card class="courses-cards-wrapper">
    <template #header>
      <h2>Les formations</h2>
    </template>
    <template #content>
      <div class="courses-wrapper">
        <article class="course" v-for="(course, index) in courses" :key="index">
          <div class="course-image"></div>
          <div class="course-infos">
            <p>{{ course.title }}</p>
            <p class="course-description">{{ course.description }}</p>
            <p class="course-date">{{ course.date }}</p>
          </div>
        </article>
        <article class="course-dummy">
          <p>A venir...</p>
        </article>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/UserDashboard/Card.vue'
import { ref } from 'vue'

const courses = ref([
  {
    id: 1,
    title: "L'Art de l'ONSINT",
    description: 'Grâce à l’OSINT, tu pourras trouver nimporte quelle ...',
    date: '2023-01-01',
    status: 'completed',
  },
])
</script>

<style scoped lang="scss">
.courses-cards-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 640px;
  height: 100%;
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid var(--color-border);
    h1 {
      font-size: 24px;
      font-weight: bold;
    }
    h2 {
      font-size: 20px;
      font-weight: normal;
      color: var(--color-text);
    }
  }

  .courses-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 8px;

    .course {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid var(--color-border);
      border-radius: 20px;
      max-width: 280px;
      min-height: 270px;
      overflow: hidden;
      .course-image {
        width: 100%;
        height: 150px;
        background-color: #203a97;
      }
      .course-infos {
        display: flex;
        flex-direction: column;
        padding: 16px;
        gap: 8px;
        p {
          font-size: 16px;
          color: var(--color-text);
        }
        .course-description {
          font-size: 14px;
          color: var(--color-text-secondary);
        }
        .course-date {
          font-size: 14px;
          color: var(--color-text-secondary);
        }
      }
    }
    .course-dummy {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      min-height: 270px;
      max-width: 280px;
      border: 1px solid var(--color-border);
      border-radius: 20px;
      p {
        font-size: 16px;
        color: var(--color-text-secondary);
      }
    }
  }
}
</style>
