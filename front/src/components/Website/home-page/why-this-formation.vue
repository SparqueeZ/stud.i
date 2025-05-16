<template>
  <section class="why-this-formation-container">
    <Separator height="25px" width="100%" />
    <div class="section-title">
      <h2>Pourquoi cette formation</h2>
    </div>
    <article class="wtf-container" v-for="(content, index) in contents">
      <div class="content">
        <img :src="content.image" alt="Sample Image" class="content-image" />
        <div :class="'content-text'" :key="index">
          <h3>{{ content.title }}</h3>
          <p>
            {{ content.description }}
          </p>
        </div>
      </div>
    </article>
    <Separator height="200px" width="100%" />
  </section>
</template>

<script setup lang="ts">
import Separator from '@/components/lib/Separator.vue'
import { ref } from 'vue'

const contents = ref([
  {
    title: 'Ultra complet + compétences clés',
    image: '../../../assets/img/pc-dec-06.png',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam veniam laboriosam libero non animi repellendus excepturi facilis deleniti voluptas autem, magnam ducimus commodi sunt omnis temporibus cumque corrupti quam saepe! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam veniam laboriosam libero non animi repellendus excepturi facilis deleniti voluptas autem, magnam ducimus commodi sunt omnis temporibus cumque corrupti quam saepe!',
  },
  {
    title: 'Formation 100% en Français',
    image: '../../../assets/img/pc-dec-06.png',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam veniam laboriosam libero non animi repellendus excepturi facilis deleniti voluptas autem, magnam ducimus commodi sunt omnis temporibus cumque corrupti quam saepe! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam veniam laboriosam libero non animi repellendus excepturi facilis deleniti voluptas autem, magnam ducimus commodi sunt omnis temporibus cumque corrupti quam saepe!',
  },
  {
    title: 'Structuré et progressif + approche pratique',
    image: '../../../assets/img/pc-dec-06.png',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam veniam laboriosam libero non animi repellendus excepturi facilis deleniti voluptas autem, magnam ducimus commodi sunt omnis temporibus cumque corrupti quam saepe! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam veniam laboriosam libero non animi repellendus excepturi facilis deleniti voluptas autem, magnam ducimus commodi sunt omnis temporibus cumque corrupti quam saepe!',
  },
  {
    title: 'Ressources et outils exclusifs',
    image: '../../../assets/img/pc-dec-06.png',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam veniam laboriosam libero non animi repellendus excepturi facilis deleniti voluptas autem, magnam ducimus commodi sunt omnis temporibus cumque corrupti quam saepe! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam veniam laboriosam libero non animi repellendus excepturi facilis deleniti voluptas autem, magnam ducimus commodi sunt omnis temporibus cumque corrupti quam saepe!',
  },
  {
    title: 'Formation actualisée + accès à vie',
    image: '../../../assets/img/pc-dec-06.png',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam veniam laboriosam libero non animi repellendus excepturi facilis deleniti voluptas autem, magnam ducimus commodi sunt omnis temporibus cumque corrupti quam saepe! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam veniam laboriosam libero non animi repellendus excepturi facilis deleniti voluptas autem, magnam ducimus commodi sunt omnis temporibus cumque corrupti quam saepe!',
  },
  {
    title: 'Une communauté exclusive',
    image: '../../../assets/img/pc-dec-06.png',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam veniam laboriosam libero non animi repellendus excepturi facilis deleniti voluptas autem, magnam ducimus commodi sunt omnis temporibus cumque corrupti quam saepe! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam veniam laboriosam libero non animi repellendus excepturi facilis deleniti voluptas autem, magnam ducimus commodi sunt omnis temporibus cumque corrupti quam saepe!',
  },
])
</script>

<style scoped lang="scss">
.why-this-formation-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5rem;
  align-items: center;
  color: white;
  background-image: url('../../../assets/img/pc-dec-07.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fff;
  .section-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    h2 {
      font-size: 3rem;
      font-weight: 700;
      color: #000;
    }
  }
  .wtf-container {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 7rem;
      .content-image {
        width: 50%;
        max-width: 720px;
        aspect-ratio: 16/9;
        background-color: #000;
        border-radius: 0.5rem;
      }
      .content-text {
        width: 50%;
        h3 {
          font-size: 2rem;
          font-weight: 700;
          color: #000;
        }
        p {
          font-size: 1rem;
          font-weight: 400;
          color: #000;
          max-width: 1080px;
        }
      }
    }
    &:nth-child(odd) {
      .content {
        flex-direction: row-reverse;
      }
    }
  }
}
</style>
