<template>
  <section class="testimonials-container">
    <Separator height="25px" width="100%" />
    <div class="section-title">
      <h2>Ils m'ont fait confiance</h2>
    </div>
    <div class="t-content">
      <div class="t-cover"></div>
      <div v-for="item in items" :key="item.id" class="testimonial-card">
        <div class="testimonial-header">
          <div class="avatar"></div>
          <div class="author-info">
            <h3 class="name">{{ item.firstname[0] }}. {{ item.lastname }}</h3>
            <p class="username">
              @{{ item.firstname.toLowerCase() }}-{{ item.lastname.toLowerCase() }}
            </p>
          </div>
        </div>
        <div class="testimonial-text">
          <p>
            <svg
              id="Calque_2"
              data-name="Calque 2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35.93 26.22"
              class="quote-icon"
            >
              <g id="Calque_1-2" data-name="Calque 1">
                <path
                  class="cls-1"
                  d="m5.99,23.01L.59,11.77,5.99.54h10.14l-5.58,11.24,5.58,11.24H5.99Zm14.45,0l-5.39-11.24L20.43.54h10.14l-5.58,11.24,5.58,11.24h-10.14Z"
                />
                <path
                  class="cls-2"
                  d="m11.34,26.22l-5.39-11.24L11.34,3.74h10.14l-5.59,11.24,5.59,11.24h-10.14Zm14.45,0l-5.39-11.24,5.39-11.24h10.14l-5.59,11.24,5.59,11.24h-10.14Z"
                />
              </g>
            </svg>
            {{ item.testimonial }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Separator from '@/components/lib/Separator.vue'
import { ref } from 'vue'

const items = ref([
  {
    id: 1,
    firstname: 'Sophie',
    lastname: 'Durand',
    job: 'Responsable IT',
    company: 'TechCorp',
    testimonial:
      "Cette formation en cybersécurité m'a permis de renforcer mes compétences en gestion des menaces. Elle offre une excellente balance entre théorie et pratique, idéale pour les professionnels souhaitant se spécialiser.",
  },
  {
    id: 2,
    firstname: 'Mathieu',
    lastname: 'Leroux',
    job: 'Consultant Sécurité',
    company: 'SafeNet Solutions',
    testimonial:
      "La formation m'a donné une compréhension approfondie des outils et techniques de protection des données. Elle est très accessible même pour ceux qui n'ont qu'une expérience de base en cybersécurité.",
  },
  {
    id: 3,
    firstname: 'Laura',
    lastname: 'Bernier',
    job: 'Ingénieure Réseau',
    company: 'InnovTech',
    testimonial:
      'Une formation essentielle pour toute personne souhaitant comprendre les enjeux actuels de la cybersécurité. Le contenu est à jour avec les dernières menaces et offre des solutions concrètes pour les contrer.',
  },
])
</script>

<style scoped lang="scss">
.testimonials-container {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .section-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #ffffff;
    }
  }

  .t-content {
    position: relative;
    display: flex;
    gap: 2rem;
    padding: 2rem 0 0;

    pointer-events: all;
    &:hover .testimonial-card:not(:hover) {
      opacity: 0.5;
    }
    .t-cover {
      position: absolute;
      pointer-events: none;
      z-index: 100;
      width: 100%;
      height: 100%;
      top: 0;
      background: rgb(5, 12, 23);
      background: linear-gradient(
        90deg,
        rgba(5, 12, 23, 1) 0%,
        rgba(5, 12, 23, 0) 10%,
        rgba(5, 12, 23, 0) 90%,
        rgba(5, 12, 23, 1) 100%
      );
    }
  }

  .testimonial-card {
    background-color: #050c17;
    border: #144078 1px solid;
    border-radius: 12px;
    padding: 1.5rem;
    width: 460px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    opacity: 1;

    &:hover {
      cursor: default;
      transform: translateY(-10px);
      opacity: 1;
    }
  }

  .testimonial-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #c5c6c7;
      margin-right: 1rem;
    }

    .author-info {
      .name {
        font-size: 1.2rem;
        font-weight: 600;
        line-height: 1.1rem;
      }
      .username {
        font-size: 0.8rem;
        color: #b3b3b3;
      }
    }
  }

  .testimonial-text {
    .quote-icon {
      margin-right: 2rem;
      width: 40px;
      text-align: center;
      float: left;
      .cls-1 {
        fill: transparent;
        stroke: #fff;
      }
      .cls-2 {
        fill: #fff;
      }
    }

    p {
      color: #c5c6c7;
      text-align: justify;
    }
  }
}
</style>
