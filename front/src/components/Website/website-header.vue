<template>
  <section class="header-wrapper">
    <header :class="['website-header', headerPosition, 'dark-bg']">
      <div class="wh-content">
        <div class="wh-right-section">
          <router-link to="/" class="wh-logo">
            <!-- <img src="@/assets/img/logo-ado.svg" alt="" srcset="" /> -->
            <svg
              id="Calque_2"
              data-name="Calque 2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64.35"
              class="logo"
            >
              <g id="Calque_1-2" data-name="Calque 1">
                <g>
                  <path
                    class="cls-1"
                    d="m64,19.24c-.05-.36-.51-.51-3.72-1.8-2.39-.96-4.59-1.49-6.41-1.8v.77c-.06.03-.15.07-.26.13-.65.32-2.32,1.08-5.13,1.54-1.98.32-5.95.73-11.16.77h-.25c-5.21-.04-9.18-.45-11.16-.77-2.81-.46-4.48-1.22-5.13-1.54-.11-.05-.2-.1-.26-.13v-.77c-1.83.3-4.03.84-6.41,1.8-3.21,1.29-3.68,1.44-3.72,1.8-.21,1.64,6.63,3.74,7.83,4.11,4.18,1.28,10.39,2.69,18.99,2.69s14.81-1.41,18.98-2.69c1.2-.37,8.03-2.47,7.83-4.11Z"
                  />
                  <path
                    class="cls-1"
                    d="m21.21,44.96l-1.83-1.83c-.65-.65-1.72-.65-2.37,0L.87,59.28c-1.16,1.16-1.16,3.04,0,4.2h0c1.16,1.16,3.04,1.16,4.2,0l16.15-16.15c.65-.65.65-1.72,0-2.37ZM4.75,63.03c-.95.95-2.49.95-3.43,0-.95-.95-.95-2.49,0-3.43l.38-.38c-.95.95-.95,2.49,0,3.43.95.95,2.49.95,3.43,0l-.38.38Z"
                  />
                  <rect
                    class="cls-1"
                    x="19.19"
                    y="40.59"
                    width="6.71"
                    height="2.41"
                    transform="translate(-22.95 28.19) rotate(-45)"
                  />
                  <path
                    class="cls-1"
                    d="m34.94,38.37c-4.26-.89-7.64-4.21-8.62-8.43-.09-.41-.46-.69-.87-.69h0c-.58,0-1.01.54-.88,1.1,1.14,4.91,5.05,8.75,10,9.78.56.12,1.08-.31,1.08-.88h0c0-.42-.3-.79-.71-.88Z"
                  />
                  <path
                    class="cls-1"
                    d="m51.84,25.41c-.3.06-.5.35-.48.65.04.44.06.88.06,1.33,0,7.83-6.35,14.18-14.18,14.18s-14.18-6.35-14.18-14.18c0-.45.02-.89.06-1.33.03-.32-.18-.62-.5-.69-.68-.15-1.33-.3-1.94-.46-.21-.05-.41.09-.44.3-.1.83-.15,1.67-.13,2.53.19,9.38,7.95,16.93,17.32,16.9s17.18-7.75,17.18-17.25c0-.75-.05-1.49-.14-2.21-.03-.21-.23-.35-.44-.3-.7.18-1.43.36-2.22.53Z"
                  />
                  <path
                    class="cls-1"
                    d="m48.98,4.6c-.41.35-.91.68-1.53.91-.32.12-.62.2-.9.26.48-.21,1.22-.62,1.8-1.41.11-.15.25-.33.37-.55-.13-.34-.36-.8-.76-1.25-.35-.39-.73-.66-1.15-.9-.79-.44-1.82-.85-3.59-1.15-1.02-.18-2-.24-3.98-.38-.69-.05-1.38-.09-2.05-.13h0s0,0,0,0c0,0,0,0,0,0h0c-.67.03-1.35.08-2.05.13-1.97.15-2.96.21-3.98.38-1.77.31-2.8.71-3.59,1.15-.43.24-.8.5-1.15.9-.62.69-.82,1.43-.9,1.67-.21.7-.72,1.98-1.48,3.77.52.1,1.15.16,1.87.08.44-.05.83-.15,1.15-.26-.08.1-.17.18-.26.26-.89.76-2.16.72-3.04.57-.52,1.2-1.13,2.59-1.83,4.18.13.04.26.09.38.13,4.16,1.36,9.24,2.44,14.88,2.44s10.71-1.07,14.88-2.44c.13-.04.26-.08.38-.13-1.78-4.01-2.99-6.84-3.47-8.23Z"
                  />
                </g>
              </g>
            </svg>
            <p class="h-text">L'art de l'OSINT</p>
          </router-link>
          <nav class="wh-nav">
            <ul>
              <li v-for="(nav, index) in navs" :key="nav.name" class="nav-item">
                <router-link :to="nav.path">{{ nav.name }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <nav class="wh-buttons">
          <ul>
            <li
              v-for="(nav, index) in navsBtn"
              :key="nav.name"
              class="nav-button"
              :class="[index === navsBtn.length - 1 ? 'cta' : '']"
            >
              <router-link class="h-text" :to="nav.path">{{ nav.name }}</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const headerPosition = ref('banner')
const headerClass = ref('')

const navs = ref([
  { id: 0, name: 'La formation', path: '/' },
  { id: 1, name: 'Les tarifs', path: '/prices' },
  { id: 2, name: 'Les ressources', path: '/ressources' },
  { id: 3, name: 'Me contacter', path: '/contact' },
])

const navsBtn = ref([
  { id: 0, name: 'Connexion', path: '/login', button: true },
  { id: 1, name: 'Accéder à la formation', path: '/app', button: true },
])

const checkIfHeaderIsAtTop = () => {
  const header = document.querySelector('.website-header')
  //   const whyThisFormation = document.querySelector(
  //     ".why-this-formation-container"
  //   );

  if (header) {
    // const rect = whyThisFormation.getBoundingClientRect();
    // const isAbove = rect.top <= 0 && rect.bottom >= 0;

    if (window.scrollY > 250 && window.scrollY < 501) {
      headerPosition.value = 'top'
    } else if (window.scrollY > 500) {
      headerPosition.value = 'fixed'
    } else {
      headerPosition.value = 'banner'
    }

    // if (isAbove) {
    //   headerClass.value = "light-bg";
    // } else {
    //   headerClass.value = "dark-bg";
    // }
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkIfHeaderIsAtTop)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkIfHeaderIsAtTop)
})
</script>

<style scoped lang="scss">
.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  .website-header {
    height: 70px;
    width: 100%;
    transition: all 0.4s ease;
    position: absolute;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;

    .h-text {
      color: #fff;
    }

    &.light-bg {
      .logo {
        fill: #000;
      }
      .h-text {
        color: #000;
      }

      .wh-nav a,
      .wh-buttons a {
        color: #000; // Change this to the desired color
      }
      .nav-button {
        a {
          background-color: #dbdbdb !important;
          border-color: #cccccc !important;
        }

        &.cta {
          a {
            background-color: #fca311 !important;
            border-color: #fca311 !important;

            &:hover {
              background-color: #d1850c !important;
              border-color: #d1850c !important;
            }
          }
        }
      }
    }
    &.dark-bg {
      .logo {
        fill: #fff;
      }

      .h-text {
        color: #fff;
      }

      .wh-nav a,
      .wh-buttons a {
        color: #fff; // Change this to the desired color
      }
      .nav-button {
        a {
          border: #144078 1px solid;
          background-color: #050c17;
        }

        &.cta {
          a {
            background-color: #fca311;
            border-color: #fca311;

            &:hover {
              background-color: #d1850c;
              border-color: #d1850c;
            }
          }
        }
      }
    }

    &.top {
      top: -100px;
    }

    &.banner {
      top: 0;
    }

    &.fixed {
      /* From https://css.glass */
      background: rgba(0, 0, 0, 0.4);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.3);

      position: fixed;
      top: 10px;
      width: 80%;
      border-radius: 5px;

      .wh-content {
        width: 95%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    .wh-content {
      width: 80%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .wh-right-section {
        display: flex;
        gap: 2rem;
      }

      .wh-logo {
        text-decoration: none;
        display: flex;
        gap: 0.9rem;

        img,
        .logo {
          width: 25px;
        }

        p {
          text-decoration: none;
          font-weight: 600;
          font-size: clamp(1rem, 0.5vw, 1.2rem);
          white-space: nowrap;
        }
      }

      .wh-nav {
        display: flex;
        align-items: center;

        ul {
          display: flex;
          padding: 0;
          gap: 2rem;

          .nav-item {
            list-style: none;

            a {
              text-decoration: none;
              transition: all 0.1s ease;
              white-space: nowrap;
              font-size: clamp(0.8rem, 0.5vw, 1.2rem);

              &:hover {
                color: var(--500-color);
              }
            }
          }
        }
      }

      .wh-buttons {
        display: flex;
        align-items: center;

        ul {
          display: flex;
          padding: 0;
          gap: 2rem;

          .nav-button {
            list-style: none;

            a {
              border: #144078 1px solid;
              background-color: #050c17;
              padding: 5px 25px;
              border-radius: 5px;
              text-decoration: none;
              transition: all 0.1s ease;
              white-space: nowrap;
              font-size: clamp(0.8rem, 0.5vw, 1.2rem);
              cursor: pointer;

              &:hover {
                background-color: #0f1d35;
              }
            }

            &.cta {
              a {
                background-color: #fca311;
                border-color: #fca311;

                &:hover {
                  background-color: #d1850c;
                  border-color: #d1850c;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
