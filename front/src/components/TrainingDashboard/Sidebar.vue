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
              <p v-if="isOpen" class="cta-nav-item">Tableau de bord</p>
            </router-link>
          </li>
        </ul>
      </nav>
    </section>

    <section class="progression-wrapper">
      <div class="progression">
        <p class="course-title">L'art de l'OSINT</p>
        <div class="progression-bar">
          <div class="progression-bar-fill" :style="{ width: '50%' }"></div>
        </div>
        <p class="progression-percentage">Complété à 50%</p>
      </div>
    </section>

    <section class="nav-wrapper">
      <nav class="nav">
        <ul class="nav-main-list">
          <li
            v-for="n in nav"
            :class="n.position === 'bottom' ? 'nav-bottom' : 'nav-top'"
            :key="n.chapterName"
          >
            <ul class="nav-items-list">
              <li v-for="item in n.lessons" :key="item.name" class="nav-item-wrapper">
                <router-link :to="item.route" class="nav-link">
                  <div
                    class="selection-dot-wrapper"
                    :class="{ 'selection-dot-wrapper--active': $route.path === item.route }"
                  >
                    <div class="selection-dot"></div>
                  </div>
                  <p class="nav-item" v-if="isOpen">{{ item.name }}</p>
                </router-link>
              </li>
            </ul>
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
const sidebarStore = useSidebarStore()

const isOpen = ref(sidebarStore.isOpen)
const toggleSidebar = () => {
  sidebarStore.toggleSidebar()
  isOpen.value = sidebarStore.isOpen
}

const nav = ref([
  {
    chapterName: 'Module 1',
    locked: false,
    position: 'top',
    lessons: [
      { name: "L'OSINT c'est quoi ?", route: '/trainer/lesson1', icon: 'lesson' },
      { name: 'Un exemple connu', route: '/trainer/lesson2', icon: 'lesson' },
      { name: 'Les aspects légaux', route: '/trainer/lesson3', icon: 'lesson' },
      { name: 'Prêt ?', route: '/trainer/lesson4', icon: 'lesson' },
    ],
  },
])
</script>

<style scoped lang="scss">
.sidebar-wrapper {
  width: 40px;
  height: 100vh;
  padding: 0 24px;
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
    z-index: 1001;
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
              padding: 2px 0 0 0;
            }
          }
        }
      }
    }
  }

  .progression-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding: 24px 0;
    .progression {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      gap: 4px;
      .course-title {
        color: var(--color-text);
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 8px;
      }
      .progression-bar {
        width: 100%;
        height: 8px;
        background-color: var(--color-border);
        border-radius: 4px;
        .progression-bar-fill {
          height: 100%;
          background-color: var(--color-primary);
          border-radius: 4px;
        }
      }
      .progression-percentage {
        color: var(--color-text-secondary);
        font-size: 0.75rem;
        font-weight: 600;
        text-align: center;
        margin-top: 4px;
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
            padding: 0 8px;
            color: var(--color-text-tertiary);
            font-size: 0.8rem;
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
            justify-content: flex-start;
            align-items: center;
            a {
              width: 100%;
              display: flex;
              align-items: center;
            }
            .nav-link {
              display: flex;
              gap: 12px;
              align-items: center;
              text-decoration: none;
              color: var(--color-text-secondary);
              transition: background-color 0.2s ease-out;
              padding: 10px 10px;
              border-radius: 10px;
              &:hover {
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
              .selection-dot-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 20px;
                width: 20px;
                min-width: 20px;
                aspect-ratio: 1/1;
                border-radius: 50%;
                background-color: transparent;
                margin-right: 0;
                border: 2px solid rgba(var(--color-primary-rgb), 0.3);
                transition: border-color 0.2s;
                position: relative;

                &::before {
                  content: '';
                  position: absolute;
                  left: 50%;
                  top: -20px;
                  transform: translateX(-50%);
                  width: 2px;
                  height: 20px;
                  background: rgba(var(--color-primary-rgb), 0.15);
                  z-index: 0;
                }

                &:first-child::before {
                  display: none;
                }

                &:last-child::after {
                  display: none;
                }

                .selection-dot {
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background-color: var(--color-text-tertiary);
                  transition: background-color 0.2s;
                  z-index: 1;
                }
                &.selection-dot-wrapper--active {
                  border-color: var(--color-primary);
                  .selection-dot {
                    background-color: var(--color-primary);
                  }
                }
              }
              .nav-item {
                transition: color 0.2s ease-out;
                padding: 2px 0 0 0;
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
