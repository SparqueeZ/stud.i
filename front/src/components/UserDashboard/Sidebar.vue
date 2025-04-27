<template>
  <aside class="sidebar-wrapper">
    <section class="logo-wrapper">
      <p class="logo-text">STUD.I</p>
    </section>
    <section class="cta-nav-wrapper">
      <nav class="cta-nav">
        <ul class="cta-nav-list">
          <li class="cta-nav-item-wrapper">
            <router-link to="/" class="cta-nav-link">
              <Icon name="home" />
              <p class="cta-nav-item">Accueil</p>
            </router-link>
          </li>
        </ul>
      </nav>
    </section>
    <section class="nav-wrapper">
      <nav class="nav">
        <ul class="nav-list">
          <li v-for="n in nav">
            <p class="nav-category">{{ n.category }}</p>
            <ul class="nav-list">
              <li v-for="item in n.items" :key="item.name" class="nav-item-wrapper">
                <router-link :to="item.route" class="nav-link">
                  <Icon :name="item.icon" />
                  <p class="nav-item">{{ item.name }}</p>
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

const nav = ref([
  {
    category: 'Cours',
    items: [
      {
        name: 'La formation',
        icon: 'book',
        route: '/formation',
      },
      {
        name: 'Certificat',
        icon: 'hat',
        route: '/certificat',
      },
    ],
  },
])
</script>

<style scoped lang="scss">
.sidebar-wrapper {
  min-width: 250px;
  height: 100vh;
  padding: 0 10px;

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
            gap: 0.5rem;
            text-decoration: none;
            color: var(--color-text);
            padding: 10px 20px;
            border-radius: 10px;
            &:hover {
              background-color: var(--color-selected);
              cursor: pointer;
            }
            &.router-link-active {
              background-color: var(--color-selected);
              cursor: default;
            }
            .cta-nav-item {
              padding: 2px 0 0 0;
            }
          }
        }
      }
    }
  }

  .nav-wrapper {
    display: flex;
    padding-top: 16px;
    .nav {
      width: 100%;
      .nav-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
        li {
          .nav-category {
            padding: 0 20px;
            color: var(--color-text-tertiary);
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
              padding: 10px 20px;
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
                padding: 2px 0 0 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
