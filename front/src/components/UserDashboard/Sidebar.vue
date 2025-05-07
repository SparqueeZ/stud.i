<template>
  <aside class="sidebar-wrapper" :class="{ 'sidebar-wrapper--open': isOpen }">
    <div class="sidebar-button-wrapper">
      <div class="sidebar-button" @click="toggleSidebar">
        <Icon
          name="doubleChevron"
          :class="{ 'sidebar-wrapper--open': !isOpen, 'sidebar-button-icon': true }"
        />
      </div>
    </div>
    <section class="logo-wrapper">
      <p class="logo-text" v-if="isOpen">STUD.I</p>
    </section>
    <section class="cta-nav-wrapper">
      <nav class="cta-nav">
        <ul class="cta-nav-list">
          <li class="cta-nav-item-wrapper">
            <router-link to="/" class="cta-nav-link">
              <Icon name="home" />
              <p v-if="isOpen" class="cta-nav-item">Accueil</p>
            </router-link>
          </li>
        </ul>
      </nav>
    </section>
    <section class="nav-wrapper">
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
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '@/components/Icon.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useUserStore } from '@/stores/user'
import { hasPermission } from '@/assets/js/auth'
const sidebarStore = useSidebarStore()
const userStore = useUserStore()

const isOpen = ref(sidebarStore.isOpen)
const toggleSidebar = () => {
  sidebarStore.toggleSidebar()
  isOpen.value = sidebarStore.isOpen
}

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
        route: '/formation',
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

let accessibleItems: any[] = []
</script>

<style scoped lang="scss">
.sidebar-wrapper {
  width: 40px;
  height: 100vh;
  padding: 0 10px;
  position: relative;
  transition: width 0.2s ease-out;

  &.sidebar-wrapper--open {
    width: 250px;
    .nav-link,
    .cta-nav-link {
      padding: 10px 20px;
    }
  }

  .sidebar-button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    position: absolute;
    top: 0;
    right: -15px;
    z-index: 101;
    .sidebar-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background-color: var(--color-background);
      height: 20px;
      width: 20px;
      cursor: pointer;
      padding: 4px;

      .icon {
        width: 20px;
        height: 20px;
        stroke: var(--color-text);
        transition:
          stroke 0.1s ease-out,
          transform 0.2s ease-out;
        &:hover {
          stroke: var(--color-text-secondary);
        }

        &.sidebar-wrapper--open {
          transform: rotate(180deg);
          .icon {
            stroke: var(--color-text);
          }
        }
      }
    }
  }

  .logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    .logo-text {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text);
    }
  }
  .cta-nav-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid var(--color-border);
    border-top: 1px solid var(--color-border);
    .cta-nav {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      .cta-nav-list {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        list-style-type: none;
        .cta-nav-item-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          a {
            width: 100%;
          }
          .cta-nav-link {
            display: flex;
            gap: 12px;
            text-decoration: none;
            color: var(--color-text-secondary);
            transition: background-color 0.2s ease-out;
            padding: 10px 10px;
            border-radius: 10px;
            &:hover {
              background-color: var(--color-selected);
              color: var(--color-text);
              .icon {
                stroke: var(--color-text);
              }
              cursor: pointer;
            }
            &.router-link-active {
              background-color: var(--color-selected);
              color: var(--color-text);
              .icon {
                stroke: var(--color-text);
              }
              cursor: default;
            }
            .icon {
              stroke: var(--color-text-secondary);
              transition: stroke 0.2s ease-out;
            }
            .cta-nav-item {
              transition: color 0.2s ease-out;
              padding: 3px 0 0 0;
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }

  .nav-wrapper {
    display: flex;
    padding-top: 16px;
    padding-bottom: 16px;
    height: calc(100% - 192px);
    .nav {
      height: 100%;
      width: 100%;
      .nav-main-list {
        list-style-type: none;
        padding: 10px;
        margin: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 32px;
        .nav-bottom {
          margin-top: auto;
        }
        li {
          display: flex;
          flex-direction: column;
          gap: 8px;
          .nav-category {
            padding: 0 4px;
            color: var(--color-text-tertiary);
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
          }
          .nav-items-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .nav-item-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            a {
              width: 100%;
            }
            .nav-link {
              display: flex;
              gap: 12px;
              text-decoration: none;
              color: var(--color-text-secondary);
              transition: background-color 0.2s ease-out;
              padding: 10px 10px;
              border-radius: 10px;
              &:hover {
                background-color: var(--color-selected);
                color: var(--color-text);
                .icon {
                  stroke: var(--color-text);
                }
                cursor: pointer;
              }
              &.router-link-active {
                background-color: var(--color-selected);
                color: var(--color-text);
                .icon {
                  stroke: var(--color-text);
                }
                cursor: default;
              }
              .icon {
                stroke: var(--color-text-secondary);
                transition: stroke 0.2s ease-out;
              }
              .nav-item {
                transition: color 0.2s ease-out;
                padding: 3px 0 0 0;
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
