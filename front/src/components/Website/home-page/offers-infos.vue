<template>
  <section class="offers-infos-container">
    <div class="offers-infos">
      <article
        v-for="offer in offers"
        :key="offer.id"
        class="offer"
        :class="offer.displayTitle.toLowerCase()"
      >
        <p>Pack</p>
        <h2>{{ offer.displayTitle }}</h2>
        <p>{{ offer.displayDescription }}</p>
        <ul>
          <li v-for="chapter in offer.chapters" :key="chapter.id">
            <Icon
              :class="chapter.isIn ? 'greenIcon' : 'redIcon'"
              :name="chapter.isIn ? 'checkCircled2' : 'crossCircled2'"
            />
            {{ chapter.name }}
          </li>
        </ul>
        <Button class="full-width" :text="offer.buttonName" />
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '@/components/lib/Button.vue'
import Icon from '@/components/lib/Icon.vue'
import { ref } from 'vue'

const offers = ref([
  {
    id: 0,
    displayTitle: 'Basique',
    displayDescription: 'Ce pack contient :',
    chapters: [
      { id: 0, name: 'OSINT sur les réseaux sociaux', isIn: true },
      { id: 1, name: 'OSINT sur les réseaux sociaux', isIn: true },
      { id: 2, name: 'OSINT sur les réseaux sociaux', isIn: true },
      { id: 3, name: 'OSINT sur les réseaux sociaux', isIn: true },
      { id: 4, name: 'OSINT sur les réseaux sociaux', isIn: false },
      { id: 5, name: 'OSINT sur les réseaux sociaux', isIn: false },
      { id: 6, name: 'OSINT sur les réseaux sociaux', isIn: false },
      { id: 7, name: 'OSINT sur les réseaux sociaux', isIn: false },
    ],
    buttonName: 'En savoir plus',
    link: 'https://formation.anjousoft.fr/',
  },
  {
    id: 1,
    displayTitle: 'Premium',
    displayDescription: 'Ce pack contient :',
    chapters: [
      { id: 0, name: 'xxxx', isIn: true },
      { id: 1, name: 'xxxx', isIn: true },
      { id: 2, name: 'xxxx', isIn: true },
      { id: 3, name: 'xxxx', isIn: true },
      { id: 4, name: 'xxxx', isIn: true },
      { id: 5, name: 'xxxx', isIn: true },
      { id: 6, name: 'xxxx', isIn: false },
      { id: 7, name: 'xxxx', isIn: false },
    ],
    buttonName: 'En savoir plus',
  },
  {
    id: 2,
    displayTitle: 'Ultra',
    displayDescription: 'Ce pack contient :',
    chapters: [
      { id: 0, name: 'xxxx', isIn: true },
      { id: 1, name: 'xxxx', isIn: true },
      { id: 2, name: 'xxxx', isIn: true },
      { id: 3, name: 'xxxx', isIn: true },
      { id: 4, name: 'xxxx', isIn: true },
      { id: 5, name: 'xxxx', isIn: true },
      { id: 6, name: 'xxxx', isIn: true },
      { id: 7, name: 'xxxx', isIn: true },
    ],
    buttonName: 'En savoir plus',
  },
])
</script>

<style scoped lang="scss">
.offers-infos-container {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .offers-infos {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    justify-content: center;
    gap: 2rem;
    // padding: 2rem;
    .offer {
      max-width: 370px;
      width: 30%;
      padding: 2rem;
      background-color: #050c17;
      border: 1px solid #144078;
      border-radius: 10px;
      position: relative;

      h2 {
        font-size: 3rem;
        font-weight: 900;
        text-transform: uppercase;
        margin-bottom: 1rem;
        padding: 0.3rem 0 0 0.3rem;
        line-height: 3rem;
        color: #d8d8d8;
        position: relative;
        z-index: 1;

        &::before {
          content: attr(data-title);
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          color: transparent;
          -webkit-text-stroke: 1px #ffffff;
          font-size: 3rem;
          font-weight: 900;
        }
      }
      p {
        font-weight: 400;
        margin-bottom: 0;
        &:first-child {
          line-height: 2rem;
          font-size: 2rem;
          font-weight: 700;

          color: #163764;
        }
      }
      ul {
        padding: 0;
        list-style: none;
        margin-bottom: 2rem;
        li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          transition: all 0.2s ease-out;
          text-wrap: nowrap;
          padding: 0.4rem 0;
          .icon {
            height: 16px;
            width: 16px;
            fill: none;
            stroke: #fff;
            &.greenIcon {
              stroke: #39b54a;
            }
            &.redIcon {
              stroke: #ed1c24;
            }
          }
          &:hover {
            margin-left: 0.2rem;
            scale: 1.1;
            cursor: default;
          }
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #050c17;
        border: 1px solid #144078;
        color: var(--50-color);
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.1s ease;
        &:hover {
          background-color: #0d1d36;
        }
      }
    }

    .basique h2::before {
      content: 'BASIQUE';
    }

    .premium h2::before {
      content: 'PREMIUM';
    }

    .ultra h2::before {
      content: 'ULTRA';
    }
  }
}
</style>
