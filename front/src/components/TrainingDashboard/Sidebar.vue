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
          <li v-for="(n, moduleIdx) in nav" :key="n.chapterName">
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
                        :class="{ 'selection-dot-wrapper--active': $route.path === item.route }"
                      >
                        <div v-if="$route.path === item.route" class="selection-dot-outer"></div>
                        <div class="selection-dot"></div>
                      </div>
                      <p class="nav-item" v-if="isOpen">{{ item.name }}</p>
                    </router-link>
                  </li>
                </ul>
              </div>
            </transition>
          </li>
        </ul>
      </nav>
    </section>

    <footer class="sidebar-footer">
      <ul class="footer-nav-list">
        <li>
          <router-link to="/support" class="footer-nav-link">
            <Icon name="help" />
            <span v-if="isOpen" class="footer-nav-item">Support</span>
          </router-link>
        </li>
        <li>
          <router-link to="/parametres" class="footer-nav-link">
            <Icon name="settings" />
            <span v-if="isOpen" class="footer-nav-item">Paramètres</span>
          </router-link>
        </li>
      </ul>
    </footer>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Icon from '@/components/lib/Icon.vue'
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
})

function toggleModule(idx: number) {
  openModules.value[idx] = !openModules.value[idx]
}

setTimeout(() => {
  nav.value[0].lessons[2].completed = true
}, 5000)

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
</script>

<style scoped lang="scss">
.sidebar-wrapper {
  width: 40px;
  height: 100vh;
  padding: 0 24px;
  position: relative;
  transition: width 0.2s ease-out;
  display: flex;
  flex-direction: column;

  &.sidebar-wrapper--open {
    width: 200px;
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
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding-top: 16px;
    padding-bottom: 16px;

    .nav {
      height: 100%;
      width: 100%;

      .nav-main-list {
        list-style-type: none;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 32px;

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
            width: 100%;
          }

          .chapter-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px;
            .chapter-infos {
              display: flex;
              gap: 8px;
              align-items: center;
              .chapter-icon {
                width: 20px;
                height: 20px;
                stroke: var(--color-text-secondary);
                transition: stroke 0.2s ease-out;
              }
              .chapter-name {
                color: var(--color-text-secondary);
                font-size: 1rem;
              }
            }
            .chapter-icons {
              display: flex;
              gap: 8px;
              align-items: center;
              .icon {
                width: 20px;
                height: 20px;
                stroke: var(--color-text-secondary);
                rotate: 90deg;
                transition:
                  stroke 0.2s ease-out,
                  transform 0.2s ease-out;

                &:hover {
                  cursor: pointer;
                  stroke: var(--color-text);
                }
                &.lock {
                  rotate: 0deg;
                  width: 12px;
                  height: 12px;
                }
              }
              .chapter-chevron--open {
                transform: rotate(180deg);
                transition: transform 0.2s;
              }
            }
            &:hover {
              .chapter-icons {
                .icon {
                  stroke: var(--color-text);
                }
              }
              .chapter-name {
                color: var(--color-text);
              }
              cursor: pointer;
            }
          }

          .module-progress-bar-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            position: relative;
          }

          .module-progress-bar {
            width: 2px;
            background-color: var(--color-border);
            border-radius: 4px;
            margin-right: 12px;
            position: absolute;
            overflow: hidden;
            left: 17px;
            height: calc(40px * var(--lesson-count, 1) - 35px);
          }

          .module-progress-bar-fill {
            width: 100%;
            background-color: var(--color-primary);
            border-radius: 4px;
            transition: height 0.2s;
          }

          .module-progress-bar + .nav-items-list {
            flex: 1;
          }

          .nav-item-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            padding: 0 8px;

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
                transition: all 0.3s ease-out;
                position: relative;

                .selection-dot-outer {
                  position: absolute;
                  z-index: 2;
                  background-color: var(--color-primary);
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  transition: all 0.3s ease-out;
                }

                .selection-dot {
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background-color: var(--color-text-tertiary);
                  transition: all 0.3s ease-out;
                  z-index: 1;
                }

                &.selection-dot-wrapper--active {
                  border-color: var(--color-primary);
                  .selection-dot {
                    background-color: var(--color-primary);
                    scale: 0.8;
                    border: 5px solid var(--color-background);
                  }
                  .selection-dot-outer {
                    opacity: 0.4;
                  }
                }
              }

              .nav-item {
                width: 100%;
                transition: color 0.2s ease-out;
                padding: 2px 0 0 0;
                font-size: 0.9rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
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
  .sidebar-footer {
    flex-shrink: 0;
    padding: 16px 0 8px 0;
    background: var(--color-background);
    .footer-nav-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        width: 100%;
        .footer-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--color-text-secondary);
          border-radius: 10px;
          padding: 10px 10px;
          transition:
            background-color 0.2s,
            color 0.2s;
          &:hover {
            background-color: var(--color-selected);
            color: var(--color-text);
            .icon {
              stroke: var(--color-text);
            }
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
            transition: stroke 0.2s;
          }
          .footer-nav-item {
            transition: color 0.2s;
            font-size: 0.9rem;
            padding: 2px 0 0 0;
          }
        }
      }
    }
  }
}
.accordion-enter-active,
.accordion-leave-active {
  transition:
    max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
