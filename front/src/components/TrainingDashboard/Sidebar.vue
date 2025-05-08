<template>
  <aside class="sidebar-wrapper" :class="{ 'sidebar-wrapper--open': isOpen }">
    <!-- BOUTON TOGGLE -->
    <div class="sidebar-button-wrapper">
      <div class="sidebar-button" @click="toggleSidebar">
        <Icon
          name="doubleChevron"
          :class="{ 'sidebar-wrapper--open': !isOpen, 'sidebar-button-icon': true }"
        />
      </div>
    </div>

    <!-- LOGO -->
    <section class="logo-wrapper">
      <p class="logo-text" v-if="isOpen">STUD.I</p>
    </section>

    <!-- CTA NAV -->
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

    <!-- PROGRESSION -->
    <section class="progression-wrapper">
      <div class="progression">
        <p class="course-title">L'art de l'OSINT</p>
        <div class="progression-bar">
          <div class="progression-bar-fill" :style="{ width: '50%' }"></div>
        </div>
        <p class="progression-percentage">Complété à 50%</p>
      </div>
    </section>

    <!-- NAVIGATION -->
    <section class="nav-wrapper">
      <nav class="nav">
        <ul class="nav-main-list">
          <li
            v-for="n in nav"
            :class="n.position === 'bottom' ? 'nav-bottom' : 'nav-top'"
            :key="n.chapterName"
          >
            <ul class="nav-items-list">
              <li
                v-for="(item, index) in n.lessons"
                :key="item.name"
                class="nav-item-wrapper"
                :class="{
                  completed: isLessonDisplayedCompleted(n.lessons, index),
                  'in-progress':
                    isLessonDisplayedCompleted(n.lessons, index) ||
                    (n.lessons[index - 1] && isLessonDisplayedCompleted(n.lessons, index - 1)),
                }"
              >
                <router-link :to="item.route" class="nav-link">
                  <div
                    class="selection-dot-wrapper"
                    :class="{ 'selection-dot-wrapper--active': $route.path === item.route }"
                  >
                    <div class="selection-dot-outer"></div>
                    <div class="selection-dot"></div>
                  </div>
                  <p class="nav-item" v-if="isOpen">{{ item.name }}</p>
                </router-link>
                <div v-if="index !== n.lessons.length - 1" class="vertical-progress-bar">
                  <div class="progress-bar" :class="getProgressBarClass(n.lessons, index)"></div>
                </div>
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
import { useRoute } from 'vue-router'

const sidebarStore = useSidebarStore()
const route = useRoute()

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
      { name: "L'OSINT c'est quoi ?", route: '/formation/12.1', icon: 'lesson', completed: true },
      { name: 'Un exemple connu', route: '/formation/12.2', icon: 'lesson', completed: true },
      { name: 'Les aspects légaux', route: '/formation/12.3', icon: 'lesson', completed: false },
      { name: 'Prêt ?', route: '/formation/12.4', icon: 'lesson', completed: false },
    ],
  },
])

setTimeout(() => {
  nav.value[0].lessons[2].completed = true
}, 5000)

// Détermine si la leçon doit être affichée comme complétée selon la route active
function isLessonDisplayedCompleted(lessons: any[], index: number) {
  const currentRouteIndex = lessons.findIndex((l) => l.route === route.path)
  return index <= currentRouteIndex
}

// Détermine si la barre de progression verticale doit être "completed" ou "in-progress"
function getProgressBarClass(lessons: any[], index: number) {
  const currentRouteIndex = lessons.findIndex((l) => l.route === route.path)
  if (index < currentRouteIndex) return 'completed'
  if (index === currentRouteIndex) return 'in-progress'
  return ''
}
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
            &.router-link-exact-active {
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
          }

          .nav-item-wrapper {
            position: relative;
            display: flex;
            align-items: center;

            .vertical-progress-bar {
              position: absolute;
              left: 9px;
              top: 20px;
              height: 100%;
              width: 2px;
              background-color: var(--color-border);
              border-radius: 4px;

              .progress-bar {
                height: 0%;
                width: 2px;
                background-color: var(--color-border);
                border-radius: 4px;
                transition: height 0.2s ease-out;
                transition:
                  height 0.2s ease-out,
                  background-color 0.2s ease-out;

                &.in-progress {
                  height: 50%;
                  background-color: var(--color-primary);
                }

                &.completed {
                  height: 100%;
                  background-color: var(--color-primary);
                }
              }
            }

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

              &.router-link-exact-active {
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
                border-radius: 50%;
                background-color: transparent;
                border: 2px solid rgba(var(--color-primary-rgb), 0.3);
                transition: border-color 0.2s;
                position: relative;

                .selection-dot-outer {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background-color: rgba(var(--color-primary-rgb), 0.15);
                  z-index: 0;
                  opacity: 0;
                  transition: opacity 0.2s;
                  pointer-events: none;
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
                  .selection-dot-outer {
                    opacity: 1;
                  }
                }
              }

              .nav-item {
                transition: color 0.2s ease-out;
                padding: 2px 0 0 0;
                font-size: 0.9rem;
              }
            }

            &.completed .selection-dot-wrapper {
              border-color: var(--color-primary);
              .selection-dot {
                background-color: var(--color-primary);
              }
            }
          }
        }
      }
    }
  }
}
</style>
