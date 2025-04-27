<template>
  <Card class="progressions-cards-wrapper">
    <template #header>
      <h2>Votre progression</h2>
    </template>
    <template #content>
      <div class="progressions-wrapper">
        <div class="progression" v-for="progression in progressions" :key="progression.id">
          <div class="infos-wrapper">
            <p class="infos">
              {{ progression.title }} <span class="course">- {{ progression.course }}</span>
            </p>
            <p class="progress">{{ progression.progress }}%</p>
          </div>
          <div class="progress-bar-wrapper">
            <div class="progress-bar" :style="{ width: `${progression.progress}%` }"></div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from './Card.vue'
import { ref } from 'vue'

const progressions = ref([
  {
    id: 1,
    title: 'Chapitre 1',
    course: "L'Art de l'ONSINT",
    progress: 100,
  },
  {
    id: 2,
    title: 'Chapitre 2',
    course: "L'Art de l'ONSINT",
    progress: 89,
  },
  {
    id: 3,
    title: 'Chapitre 3',
    course: "L'Art de l'ONSINT",
    progress: 47,
  },
  {
    id: 4,
    title: 'Chapitre 4',
    course: "L'Art de l'ONSINT",
    progress: 0,
  },
])
</script>

<style scoped lang="scss">
.progressions-cards-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 640px;
  height: 100%;
  color: var(--color-text);
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid var(--color-border);

    h2 {
      font-size: 20px;
      font-weight: normal;
      color: var(--color-text);
    }
  }

  .progressions-wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px;

    .progression {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .infos-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .infos {
          font-size: 16px;
          color: var(--color-text);
          text-transform: capitalize;
          .course {
            font-size: 14px;
            color: var(--color-text-secondary);
          }
        }

        p {
          font-size: 16px;
          font-weight: normal;
        }

        .progress {
          font-weight: 600;
          color: var(--color-text-secondary);
          font-size: 14px;
        }
      }

      .progress-bar-wrapper {
        width: 100%;
        height: 10px;
        background-color: var(--color-border);
        border-radius: 5px;

        .progress-bar {
          height: 100%;
          background-color: var(--color-primary);
          border-radius: 5px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .progressions-cards-wrapper {
    max-width: 100%;
    padding: 16px;

    .progressions-wrapper {
      gap: 16px;

      .progression {
        .infos-wrapper {
          flex-direction: column;
          align-items: flex-start;

          .infos {
            font-size: 14px;
          }

          .progress {
            align-self: flex-end;
          }
        }

        .progress-bar-wrapper {
          height: 8px;
        }
      }
    }
  }
}
</style>
