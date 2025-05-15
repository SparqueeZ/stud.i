<template>
  <section class="content">
    <section class="course-img-wrapper">
      <div class="cta-button-wrapper" v-if="!userHasCourse">
        <div class="cta-button">
          <p class="cta-button-text">Rejoindre le cours</p>
        </div>
      </div>
      <div class="cta-button-wrapper" v-else>
        <router-link to="/app/formation/12">
          <div class="cta-button">
            <p class="cta-button-text">Continuer</p>
          </div>
        </router-link>
      </div>
    </section>
    <section class="course-title-wrapper">
      <div class="course-infos-wrapper">
        <h1 class="title">L'art de l'OSINT</h1>
        <p class="description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum
        </p>
      </div>
      <article class="course-trainer-infos-wrapper">
        <header class="trainer-header">
          <p class="title">Créateur</p>
        </header>
        <section class="trainer-infos">
          <p class="trainer-name">Romain P.</p>
          <p class="trainer-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. J'adore
            Parlons cyber c'est fou co...
          </p>
        </section>
      </article>
    </section>
    <section class="course-ratings-wrapper">
      <article class="rating" v-for="(r, index) in ratings" :key="index"></article>
    </section>
  </section>
</template>

<script setup lang="ts">
import UserDashboard from '@/layouts/UserDashboard.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const userHasCourse = ref(true)

const ratings = ref([
  {
    id: 1,
    title: 'Note',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    value: 4.5,
  },
  {
    id: 2,
    title: 'Difficulté',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    value: 3.5,
  },
])
import { ref } from 'vue'
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-background);

  .course-img-wrapper {
    width: 100%;
    min-height: 350px;
    background-color: #1a1a1a;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1a1a1a;
    position: relative;

    .cta-button-wrapper {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 40px;
      right: 40px;
      .cta-button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--color-primary);
        border-radius: 5px;
        min-width: 135px;
        height: 35px;
        cursor: pointer;
        .cta-button-text {
          font-weight: 600;
          font-size: 0.8rem;
          color: var(--color-background);
        }
      }
    }
  }

  .course-title-wrapper {
    display: flex;
    padding: 63px 32px;
    background-color: var(--color-background);
    gap: 64px;
    .course-infos-wrapper {
      display: flex;
      flex-direction: column;
      width: 64%;
      .title {
        font-size: 24px;
        font-weight: bold;
        color: var(--color-text);
      }
      .description {
        font-size: 16px;
        color: var(--color-text-secondary);
        margin-top: 10px;
      }
    }
    .course-trainer-infos-wrapper {
      display: flex;
      flex-direction: column;
      width: 34%;
      border: 1px solid var(--color-border);
      border-radius: 20px;
      .trainer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid var(--color-border);
        .title {
          font-size: 20px;
          font-weight: normal;
          color: var(--color-text);
        }
      }
      .trainer-infos {
        display: flex;
        flex-direction: column;

        padding: 20px;
        .trainer-name {
          font-size: 20px;
          font-weight: bold;
          color: var(--color-text);
        }
        .trainer-description {
          font-size: 16px;
          color: var(--color-text-secondary);
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
