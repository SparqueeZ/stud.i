<template>
  <section v-if="isCourseNav" class="course-nav">
    <section class="progression-wrapper">
      <div class="progression">
        <p class="course-title">L'art de l'OSINT</p>
        <div class="progression-bar">
          <div class="progression-bar-fill" :style="{ width: '50%' }"></div>
        </div>
        <p class="progression-percentage">Complété à 50%</p>
      </div>
    </section>

    <section class="course">
      <nav class="nav">
        <ul class="nav-main-list">
          <li v-for="(n, moduleIdx) in courseNav" :key="n.chapterName">
            <div class="chapter-wrapper" @click="toggleModule(moduleIdx)">
              <div class="chapter-infos">
                <p class="chapter-name">{{ n.chapterName }}</p>
              </div>
              <div class="chapter-icons">
                <Icon v-if="n.locked" name="motdepasse" class="lock" />
                <Icon name="chevron" :class="{ 'chapter-chevron--open': openModules[moduleIdx] }" />
              </div>
            </div>
            <transition name="accordion">
              <div v-show="openModules[moduleIdx]" class="module-progress-bar-wrapper">
                <div class="module-progress-bar" :style="{ '--lesson-count': n.lessons.length }">
                  <div
                    class="module-progress-bar-fill"
                    :style="{
                      height: getModuleProgressPercent(n.lessons) + '%',
                    }"
                  ></div>
                </div>
                <ul class="nav-items-list">
                  <li
                    v-for="(item, index) in n.lessons"
                    :key="item.name"
                    class="nav-item-wrapper"
                    :class="{
                      completed: item.completed,
                      'in-progress':
                        isLessonDisplayedCompleted(n.lessons, index) ||
                        (n.lessons[index - 1] && isLessonDisplayedCompleted(n.lessons, index - 1)),
                    }"
                  >
                    <router-link :to="item.route" class="nav-link">
                      <div
                        class="selection-dot-wrapper"
                        :class="{
                          'selection-dot-wrapper--active': $route.path === item.route,
                        }"
                      >
                        <div v-if="$route.path === item.route" class="selection-dot-outer"></div>
                        <div class="selection-dot"></div>
                      </div>
                      <p class="nav-item" v-if="isOpen">{{ item.name }}</p>
                    </router-link>
                  </li>
                  <li class="nav-item-wrapper quiz-item">
                    <router-link :to="n.quiz.route" class="nav-link">
                      <div
                        class="quiz-icon-wrapper"
                        :class="{
                          'quiz-icon-wrapper--active': $route.path === n.quiz.route,
                        }"
                      >
                        <Icon name="squareCheck" />
                      </div>
                      <p class="nav-item" v-if="isOpen">{{ n.quiz.name }}</p>
                    </router-link>
                  </li>
                </ul>
              </div>
            </transition>
          </li>
        </ul>
      </nav>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '@/components/Icon.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useUserStore } from '@/stores/user'
import { hasPermission } from '@/assets/js/auth'
const sidebarStore = useSidebarStore()
const userStore = useUserStore()

const test = ref(false)

const isOpen = ref(sidebarStore.isOpen)
const toggleSidebar = () => {
  sidebarStore.toggleSidebar()
  isOpen.value = sidebarStore.isOpen
}

const route = useRoute()

interface NavItem {
  name: string
  icon: string
  route: string
  access?: boolean
}

interface NavCategory {
  category?: string
  position?: string
  access: boolean
  items: NavItem[]
}

const nav = ref<Array<NavCategory>>([
  {
    category: 'Cours',
    access: true,
    items: [
      {
        name: 'La formation',
        icon: 'book',
        route: '/app/formation',
        access: true,
      },
      {
        name: 'Certificat',
        icon: 'hat',
        route: '/certificat',
        access: true,
      },
    ],
  },
  {
    category: 'Administration',
    access: hasPermission(userStore.user, 'courses', 'update'),
    items: [
      {
        name: 'Gérer la formation',
        icon: 'settings',
        route: '/trainer/formation',
        access: hasPermission(userStore.user, 'courses', 'update'),
      },
      {
        name: 'Gérer les utilisateurs',
        icon: 'user',
        route: '/trainer/utilisateurs',
        access: hasPermission(userStore.user, 'users', 'view'),
      },
    ],
  },
  {
    position: 'bottom',
    access: true,
    items: [
      {
        name: 'Support',
        icon: 'help',
        route: '/support',
        access: true,
      },
      {
        name: 'Paramètres',
        icon: 'settings',
        route: '/parametres',
        access: true,
      },
    ],
  },
])

const courseNav = ref([
  {
    chapterName: 'Module 1',
    locked: false,
    position: 'top',
    lessons: [
      {
        name: "L'OSINT c'est quoi ?",
        route: '/app/formation/12.1',
        icon: 'lesson',
        completed: true,
      },
      { name: 'Un exemple connu', route: '/app/formation/12.2', icon: 'lesson', completed: true },
      {
        name: 'Les aspects légaux',
        route: '/app/formation/12.3',
        icon: 'lesson',
        completed: false,
      },
      { name: 'Prêt ?', route: '/app/formation/12.4', icon: 'lesson', completed: false },
    ],
    quiz: {
      name: 'Quizz du module',
      route: '/app/formation/12.quiz',
      icon: 'quiz',
    },
  },
  {
    chapterName: 'Module 2',
    locked: false,
    position: 'top',
    lessons: [
      {
        name: 'Introduction à la cybersécurité',
        route: '/app/formation/22.1',
        icon: 'lesson',
        completed: true,
      },
      {
        name: 'Les menaces courantes',
        route: '/app/formation/22.2',
        icon: 'lesson',
        completed: false,
      },
      {
        name: 'Les bonnes pratiques',
        route: '/app/formation/22.3',
        icon: 'lesson',
        completed: false,
      },
      { name: 'Conclusion', route: '/app/formation/22.4', icon: 'lesson', completed: false },
    ],
    quiz: {
      name: 'Quizz du module',
      route: '/app/formation/22.quiz',
      icon: 'quiz',
    },
  },
  {
    chapterName: 'Module 3',
    locked: true,
    position: 'top',
    lessons: [
      {
        name: 'Introduction au hacking éthique',
        route: '/app/formation/32.1',
        icon: 'lesson',
        completed: false,
      },
      {
        name: 'Les outils de base',
        route: '/app/formation/32.2',
        icon: 'lesson',
        completed: false,
      },
      { name: 'Étude de cas', route: '/app/formation/32.3', icon: 'lesson', completed: false },
      { name: 'Certification', route: '/app/formation/32.4', icon: 'lesson', completed: false },
    ],
    quiz: {
      name: 'Quizz du module',
      route: '/app/formation/32.quiz',
      icon: 'quiz',
    },
  },
  {
    chapterName: 'Module 4',
    locked: true,
    position: 'bottom',
    lessons: [
      {
        name: 'Introduction à la cryptographie',
        route: '/app/formation/42.1',
        icon: 'lesson',
        completed: false,
      },
      {
        name: 'Les algorithmes courants',
        route: '/app/formation/42.2',
        icon: 'lesson',
        completed: false,
      },
      {
        name: 'Applications pratiques',
        route: '/app/formation/42.3',
        icon: 'lesson',
        completed: false,
      },
      { name: 'Prochaines étapes', route: '/app/formation/42.4', icon: 'lesson', completed: false },
    ],
    quiz: {
      name: 'Quizz du module',
      route: '/app/formation/42.quiz',
      icon: 'quiz',
    },
  },
])

const openModules = ref<boolean[]>([])

onMounted(() => {
  // Ouvre le premier module par défaut, les autres fermés
  openModules.value = nav.value.map((_, idx) => idx === 0)
  setTimeout(() => {
    test.value = true
  }, 2000)
})

function toggleModule(idx: number) {
  openModules.value[idx] = !openModules.value[idx]
}

// Détermine si la leçon doit être affichée comme complétée selon la route active
function isLessonDisplayedCompleted(lessons: any[], index: number) {
  const currentRouteIndex = lessons.findIndex((l) => l.route === route.path)
  return index <= currentRouteIndex
}

// Détermine le pourcentage de progression d'un module (nombre de leçons complétées / total)
function getModuleProgressPercent(lessons: any[]) {
  const completedCount = lessons.filter((l) => l.completed).length
  return (completedCount / lessons.length) * 100
}

// Détermine si la barre de progression verticale doit être "completed" ou "in-progress"
function getProgressBarClass(lessons: any[], index: number) {
  const currentRouteIndex = lessons.findIndex((l) => l.route === route.path)
  if (index < currentRouteIndex) return 'completed'
  if (index === currentRouteIndex) return 'in-progress'
  return ''
}

// Nouvelle logique pour détecter la section "cours"
const isCourseNav = computed(() => {
  // Affiche la navigation de cours pour /formation et /formation/...
  return route.path.startsWith('/app/formation/')
})

// Clé dynamique pour la transition, change selon la section affichée
const navSectionKey = computed(() => (isCourseNav.value ? 'course-nav' : 'basic-nav'))

let accessibleItems: any[] = []
</script>

<style scoped lang="scss">
.course-nav {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.quiz-item {
}
.quiz-icon-wrapper {
  padding: 0 0 0 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    width: 16px;
    height: 16px;
    stroke: var(--color-text-secondary);
  }
}
</style>
