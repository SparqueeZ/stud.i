<template>
  <Card class="ressources-card-wrapper">
    <template #header>
      <h2>Ressources</h2>
    </template>
    <template #content>
      <div class="ressources-wrapper">
        <div class="ressource" v-for="ressource in ressources" :key="ressource.id">
          <div class="ressource-item-wrapper">
            <div class="ressource-icon-wrapper">
              <Icon :name="ressource.type" />
            </div>
            <div class="ressource-infos-wrapper">
              <p class="ressource-infos">
                {{ ressource.title }}
              </p>
              <!-- <p class="ressource-type">{{ ressource.type }}</p> -->
            </div>
          </div>
          <div class="ressource-chapter-wrapper">
            <p class="ressource-chapter">{{ ressource.course }} - {{ ressource.chapter }}</p>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from './Card.vue'
import Icon from '@/components/Icon.vue'
import { ref } from 'vue'

const ressources = ref([
  {
    id: 1,
    title: 'super_projet_vue.zip',
    type: 'zip',
    chapter: 'Chapitre 1',
    course: "L'Art de l'OSINT",
  },
  {
    id: 2,
    title: 'super_pdf_pour_le_projet_applicatif.pdf',
    type: 'pdf',
    chapter: 'Chapitre 1',
    course: "L'Art de l'OSINT",
  },
  {
    id: 3,
    title: 'super_pdf_2_pour_le_projet_applicatif.pdf',
    type: 'pdf',
    chapter: 'Chapitre 1',
    course: "L'Art de l'OSINT",
  },
  {
    id: 4,
    title: 'comment_hacker_un_telephone_a_distance.pdf',
    type: 'pdf',
    chapter: 'Chapitre 1',
    course: "L'Art de l'OSINT",
  },
  {
    id: 5,
    title: 'super_pdf_3_pour_le_projet_applicatif.pdf',
    type: 'pdf',
    chapter: 'Chapitre 2',
    course: "L'Art de l'OSINT",
  },
  {
    id: 6,
    title: 'super_projet_pour_le_projet_applicatif.zip',
    type: 'zip',
    chapter: 'Chapitre 2',
    course: "L'Art de l'OSINT",
  },
])
</script>

<style scoped lang="scss">
.ressources-card-wrapper {
  display: flex;
  flex-direction: column;
  color: var(--color-text);
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid var(--color-border);

    h2 {
      font-size: 20px;
      font-weight: normal;
      color: var(--color-text);
    }
  }

  .ressources-wrapper {
    display: flex;
    flex-direction: column;
    padding: 16px;
    .ressource {
      display: flex;
      align-items: center;
      padding: 10px 0;
      width: 100%;
      justify-content: space-between;

      .ressource-item-wrapper {
        display: flex;
        align-items: center;
        gap: 16px;
        max-width: calc(100% - 170px); /* Reserve space for chapter wrapper */
        flex: 1;
        overflow: hidden;

        .ressource-icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: var(--color-text-tertiary);
          .icon {
            width: 20px;
            height: 20px;
            stroke: var(--color-text-secondary);
          }
        }
        .ressource-infos-wrapper {
          display: flex;
          flex-direction: column;
          width: calc(100% - 51px); /* Icon width + gap */
          min-width: 0; /* This is critical for text-overflow to work */
          flex: 1;

          .ressource-infos {
            font-size: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
          }
          .course {
            font-size: 14px;
            color: var(--color-text);
          }
        }
        .ressource-type {
          font-size: 14px;
          color: var(--color-text);
        }
      }
      .ressource-chapter-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        min-width: 170px;
        flex-shrink: 0;

        .ressource-chapter {
          font-size: 12px;
          color: var(--color-text-secondary);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .ressources-card-wrapper {
    min-width: 100%;
    max-width: 100%;
    padding: 16px;

    .ressources-wrapper {
      .ressource {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;

        .ressource-item-wrapper {
          gap: 8px;
          width: 100%;
          max-width: 100%;

          .ressource-infos-wrapper {
            max-width: calc(100% - 43px); /* Adjusted for smaller gap */

            .ressource-infos {
              font-size: 14px; /* Smaller font size on mobile */
            }
          }
        }

        .ressource-chapter-wrapper {
          justify-content: flex-start;
          min-width: auto;
          padding-left: 43px; /* Align with content */
          width: 100%;
        }
      }
    }
  }
}
</style>
