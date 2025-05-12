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
    <section class="global-nav-wrapper">
      <transition name="slide-fade" mode="out-in">
        <component :is="menuComponent" :key="menuKey" />
      </transition>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '@/components/Icon.vue'
import { useSidebarStore } from '@/stores/sidebar'
const sidebarStore = useSidebarStore()

import SidebarBasic from './SidebarBasic.vue'
import SidebarCourse from './SidebarCourse.vue'

const route = useRoute()

const isUserPage = computed(() => route.path.startsWith('/app/formation/'))

const menuComponent = computed(() => (isUserPage.value ? SidebarCourse : SidebarBasic))
const menuKey = computed(() => (isUserPage.value ? 'user' : 'default'))

const isOpen = ref(sidebarStore.isOpen)
const toggleSidebar = () => {
  sidebarStore.toggleSidebar()
  isOpen.value = sidebarStore.isOpen
}
</script>

<style lang="scss">
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
  position: absolute;
  width: 100%;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>

<style lang="scss">
.sidebar-wrapper {
  width: 40px;
  height: 100vh;
  padding: 0 10px;
  position: relative;
  transition: width 0.2s ease-out;
  overflow: hidden;

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

  .global-nav-wrapper {
    display: flex;
    width: 100%;
    height: calc(100% - 160px);

    .basic-nav {
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
    .course-nav {
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
  }
}

/* Transition for nav switch */
.sidebar-nav-fade-enter-active,
.sidebar-nav-fade-leave-active {
  transition: opacity 5s cubic-bezier(0.4, 0, 0.2, 1);
}
.sidebar-nav-fade-enter-from,
.sidebar-nav-fade-leave-to {
  opacity: 0;
}
.sidebar-nav-fade-enter-to,
.sidebar-nav-fade-leave-from {
  opacity: 1;
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
