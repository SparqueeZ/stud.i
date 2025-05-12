<template>
  <section class="basic-nav">
    <nav class="nav">
      <ul class="nav-main-list">
        <li
          v-for="n in nav"
          :class="n.position === 'bottom' ? 'nav-bottom' : 'nav-top'"
          :key="n.category"
        >
          <template v-if="(accessibleItems = n.items.filter((item) => item.access)).length > 0">
            <p class="nav-category" v-if="isOpen && n.category">{{ n.category }}</p>
            <ul class="nav-items-list">
              <li v-for="item in accessibleItems" :key="item.name" class="nav-item-wrapper">
                <router-link :to="item.route" class="nav-link">
                  <Icon :name="item.icon" />
                  <p class="nav-item" v-if="isOpen">{{ item.name }}</p>
                </router-link>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </nav>
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
      { name: "L'OSINT c'est quoi ?", route: '/formation/12.1', icon: 'lesson', completed: true },
      { name: 'Un exemple connu', route: '/formation/12.2', icon: 'lesson', completed: true },
      { name: 'Les aspects légaux', route: '/formation/12.3', icon: 'lesson', completed: false },
      { name: 'Prêt ?', route: '/formation/12.4', icon: 'lesson', completed: false },
    ],
  },
  {
    chapterName: 'Module 2',
    locked: false,
    position: 'top',
    lessons: [
      {
        name: 'Introduction à la cybersécurité',
        route: '/formation/22.1',
        icon: 'lesson',
        completed: true,
      },
      { name: 'Les menaces courantes', route: '/formation/22.2', icon: 'lesson', completed: false },
      { name: 'Les bonnes pratiques', route: '/formation/22.3', icon: 'lesson', completed: false },
      { name: 'Conclusion', route: '/formation/22.4', icon: 'lesson', completed: false },
    ],
  },
  {
    chapterName: 'Module 3',
    locked: true,
    position: 'top',
    lessons: [
      {
        name: 'Introduction au hacking éthique',
        route: '/formation/32.1',
        icon: 'lesson',
        completed: false,
      },
      { name: 'Les outils de base', route: '/formation/32.2', icon: 'lesson', completed: false },
      { name: 'Étude de cas', route: '/formation/32.3', icon: 'lesson', completed: false },
      { name: 'Certification', route: '/formation/32.4', icon: 'lesson', completed: false },
    ],
  },
  {
    chapterName: 'Module 4',
    locked: true,
    position: 'bottom',
    lessons: [
      {
        name: 'Introduction à la cryptographie',
        route: '/formation/42.1',
        icon: 'lesson',
        completed: false,
      },
      {
        name: 'Les algorithmes courants',
        route: '/formation/42.2',
        icon: 'lesson',
        completed: false,
      },
      {
        name: 'Applications pratiques',
        route: '/formation/42.3',
        icon: 'lesson',
        completed: false,
      },
      { name: 'Prochaines étapes', route: '/formation/42.4', icon: 'lesson', completed: false },
    ],
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

// Nouvelle logique pour détecter la section "cours"
const isCourseNav = computed(() => {
  // Affiche la navigation de cours pour /formation et /formation/...
  return route.path.startsWith('/app/formation/')
})

// Clé dynamique pour la transition, change selon la section affichée
const navSectionKey = computed(() => (isCourseNav.value ? 'course-nav' : 'basic-nav'))

let accessibleItems: any[] = []
</script>

<style scoped></style>
