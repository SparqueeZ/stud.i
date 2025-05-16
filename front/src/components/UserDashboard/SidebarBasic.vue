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
import Icon from '@/components/lib/Icon.vue'
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
        route: '/app/certificat',
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
        route: '/app/trainer/formations',
        access: hasPermission(userStore.user, 'courses', 'update'),
      },
      {
        name: 'Gérer les utilisateurs',
        icon: 'user',
        route: '/app/trainer/utilisateurs',
        access: hasPermission(userStore.user, 'users', 'view'),
      },
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

<style scoped>
.basic-nav {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
