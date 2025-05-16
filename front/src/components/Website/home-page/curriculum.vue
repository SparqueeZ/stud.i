<template>
  <section class="curriculum-container">
    <Separator height="25px" width="100%" />
    <div class="section-title">
      <h2>Curriculum de la formation</h2>
    </div>
    <div class="c-content">
      <!-- Afficher les trois premiers chapitres -->
      <div
        v-for="chapter in chapters.slice(0, 3)"
        :key="chapter.id"
        class="chapter"
        :class="{ open: chapter.open }"
      >
        <!-- Titre du chapitre -->
        <div class="chapter-title" @click="toggleChapter(chapter)">
          {{ chapter.title }}
          <span class="toggleIcon">{{ chapter.open ? '—' : '＋' }}</span>
        </div>

        <!-- Liste des leçons avec transition pour l'accordéon -->
        <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <div v-if="chapter.open" class="lessons">
            <div v-for="lesson in chapter.lessons" :key="lesson.id" class="lesson">
              <Icon name="book" class="icon" />
              <p>{{ lesson.title }}</p>
            </div>
          </div>
        </transition>
      </div>

      <!-- Afficher les chapitres supplémentaires si showAll est activé -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="showAll">
          <div
            v-for="chapter in chapters.slice(3)"
            :key="chapter.id"
            class="chapter"
            :class="{ open: chapter.open }"
          >
            <div class="chapter-title" @click="toggleChapter(chapter)">
              {{ chapter.title }}
              <span class="toggleIcon">{{ chapter.open ? '—' : '＋' }}</span>
            </div>

            <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
              <div v-if="chapter.open" class="lessons">
                <div v-for="lesson in chapter.lessons" :key="lesson.id" class="lesson">
                  <Icon name="book" class="icon" />
                  <p>{{ lesson.title }}</p>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition>

      <!-- Bouton pour afficher/masquer tous les chapitres -->
      <button @click="toggleShowAll">
        {{ showAll ? 'Voir moins' : 'Voir plus' }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const totalHeight = ref(0)

// Données des chapitres
const chapters = ref([
  {
    id: 0,
    title: 'Introduction',
    open: false,
    lessons: [
      { id: 0, title: "L'OSINT c'est quoi ?" },
      { id: 1, title: "L'aspect légal de l'OSINT" },
      { id: 2, title: "L'importance de l'OSINT" },
    ],
  },
  {
    id: 1,
    title: 'Apprendre à apprendre',
    open: false,
    lessons: [
      { id: 0, title: 'Un environnement de travail sain' },
      { id: 1, title: "Un mental d'acier" },
    ],
  },
  {
    id: 2,
    title: "L'OSINT sur les sites webs",
    open: false,
    lessons: [
      { id: 0, title: "Un site web c'est fait comment ?" },
      { id: 1, title: 'Les ressources' },
    ],
  },
  {
    id: 3,
    title: "L'OSINT sur les réseaux sociaux",
    open: false,
    lessons: [
      { id: 0, title: "Les réseaux sociaux c'est quoi ?" },
      { id: 1, title: 'Les réseaux sociaux et la vie privée' },
    ],
  },
  {
    id: 4,
    title: "L'OSINT sur les moteurs de recherche",
    open: false,
    lessons: [
      { id: 0, title: "Les moteurs de recherche c'est quoi ?" },
      { id: 1, title: 'Les moteurs de recherche et la vie privée' },
    ],
  },
  {
    id: 5,
    title: "L'OSINT sur les forums",
    open: false,
    lessons: [
      { id: 0, title: "Les forums c'est quoi ?" },
      { id: 1, title: 'Les forums et la vie privée' },
    ],
  },
  {
    id: 6,
    title: "L'OSINT sur les blogs",
    open: false,
    lessons: [
      { id: 0, title: "Les blogs c'est quoi ?" },
      { id: 1, title: 'Les blogs et la vie privée' },
    ],
  },
  {
    id: 7,
    title: "L'OSINT sur les vidéos",
    open: false,
    lessons: [
      { id: 0, title: "Les vidéos c'est quoi ?" },
      { id: 1, title: 'Les vidéos et la vie privée' },
    ],
  },
  {
    id: 8,
    title: "L'OSINT sur les images",
    open: false,
    lessons: [
      { id: 0, title: "Les images c'est quoi ?" },
      { id: 1, title: 'Les images et la vie privée' },
    ],
  },
  {
    id: 9,
    title: "L'OSINT sur les podcasts",
    open: false,
    lessons: [
      { id: 0, title: "Les podcasts c'est quoi ?" },
      { id: 1, title: 'Les podcasts et la vie privée' },
    ],
  },
  {
    id: 10,
    title: "L'OSINT sur les emails",
    open: false,
    lessons: [
      { id: 0, title: "Les emails c'est quoi ?" },
      { id: 1, title: 'Les emails et la vie privée' },
    ],
  },
])

const showAll = ref(false)

// Fonction pour basculer l'état (ouvert/fermé) d'un chapitre spécifique
const toggleChapter = (chapter: any) => {
  chapter.open = !chapter.open
}

// Fonction pour basculer l'affichage de tous les chapitres
const toggleShowAll = () => {
  showAll.value = !showAll.value
}

// Transitions pour l'animation de l'accordéon
const beforeEnter = (el: HTMLElement) => {
  el.style.height = '0' // commence avec une hauteur de 0 pour les nouveaux éléments
}

const enter = (el: HTMLElement) => {
  el.style.height = `${el.scrollHeight}px` // hauteur naturelle pendant l'ouverture
  el.style.transition = 'height 0.3s ease'
}

const leave = (el: HTMLElement) => {
  el.style.transition = 'height 0.3s ease' // s'assurer que la transition est activée
  el.style.height = `${el.scrollHeight}px` // d'abord fixer la hauteur au scrollHeight
  requestAnimationFrame(() => {
    // Forcer le recalcul de la mise en page pour garantir la bonne transition
    el.style.height = '0' // puis transition vers une hauteur de 0
  })
}
</script>

<style scoped lang="scss">
.curriculum-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  color: white;
  background-color: #fff;

  .section-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;

    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #000;
    }
  }

  .c-content {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden; // assure que les éléments sont cachés pendant la fermeture
    gap: 2rem;

    .chapter {
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden; // assure que les éléments sont cachés pendant la fermeture

      .chapter-title {
        font-size: 1.2rem;
        font-weight: 700;
        color: #fff;
        background-color: #050c17;
        padding: 0.5rem 1rem;
        text-transform: uppercase;
        cursor: pointer;
        position: relative;
      }

      .lessons {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .lesson {
          background-color: #c8c8c8;
          padding: 0.5rem 1rem;

          p {
            font-size: 1rem;
            font-weight: 400;
            color: #000;
          }
        }
      }

      .toggleIcon {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.5rem;
        font-weight: bold;
        color: #666;
      }
    }
  }
}

// Transition de la hauteur
.slide-enter-active,
.slide-leave-active {
  transition: height 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  height: 0;
}
</style>
