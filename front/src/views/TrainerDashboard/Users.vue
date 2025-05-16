<template>
  <section class="content">
    <!-- Statistiques générales -->
    <div class="stats-cards">
      <div class="stat-card">
        <p class="stat-title">Utilisateurs</p>
        <p class="stat-value">{{ users.length }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-title">Actifs</p>
        <p class="stat-value">{{ activeUsers }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-title">Ayant acheté la formation</p>
        <p class="stat-value">{{ boughtUsers }}</p>
      </div>
    </div>

    <!-- Tableau des utilisateurs -->
    <div class="users-table-card">
      <h2>Liste des utilisateurs</h2>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Date d'inscription</th>
              <th>Formations achetées</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              @click="openPopup(user)"
              style="cursor: pointer"
            >
              <td>{{ user.lastName }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.signupDate }}</td>
              <td>
                <ul>
                  <li v-for="course in user.courses" :key="course">{{ course }}</li>
                </ul>
              </td>
              <td>
                <span
                  :class="{
                    'status-active': user.active,
                    'status-inactive': !user.active,
                  }"
                >
                  {{ user.active ? 'Actif' : 'Inactif' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Popup v-model="popupOpen">
      <div class="popup-test">Popup</div>
    </Popup>
  </section>
</template>

<script setup lang="ts">
import UserDashboard from '@/layouts/UserDashboard.vue'
import Popup from '@/components/Popup.vue'
import { ref, computed } from 'vue'

const users = ref([
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Martin',
    email: 'alice.martin@email.com',
    signupDate: '2023-01-15',
    courses: ["L'Art de l'OSINT"],
    active: true,
    bought: true,
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Durand',
    email: 'bob.durand@email.com',
    signupDate: '2023-02-10',
    courses: [],
    active: false,
    bought: false,
  },
  {
    id: 3,
    firstName: 'Chloé',
    lastName: 'Petit',
    email: 'chloe.petit@email.com',
    signupDate: '2023-03-05',
    courses: ["L'Art de l'OSINT"],
    active: true,
    bought: true,
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Lefevre',
    email: 'david.lefevre@email.com',
    signupDate: '2023-04-20',
    courses: [],
    active: false,
    bought: false,
  },
  {
    id: 5,
    firstName: 'Emma',
    lastName: 'Bernard',
    email: 'emma.bernard@email.com',
    signupDate: '2023-05-12',
    courses: ["L'Art de l'OSINT"],
    active: true,
    bought: true,
  },
])

const activeUsers = computed(() => users.value.filter((u) => u.active).length)
const boughtUsers = computed(() => users.value.filter((u) => u.bought).length)

const popupOpen = ref(false)
const selectedUser = ref<any>(null)

function openPopup(user: any) {
  selectedUser.value = user
  popupOpen.value = true
}
</script>

<style scoped lang="scss">
.content {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-inline: auto;
  width: 100%;
  max-width: 1280px;
  box-sizing: border-box;
}

.stats-cards {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  .stat-card {
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 24px 32px;
    min-width: 220px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .stat-title {
      color: var(--color-text-secondary);
      font-size: 1rem;
      margin-bottom: 8px;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: var(--color-primary);
    }
  }
}

.users-table-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 24px;
  h2 {
    margin-bottom: 16px;
    color: var(--color-text);
    font-size: 1.3rem;
    font-weight: 600;
  }
  .table-wrapper {
    overflow-x: auto;
    table {
      width: 100%;
      border-collapse: collapse;
      th,
      td {
        padding: 12px 8px;
        text-align: left;
        border-bottom: 1px solid var(--color-border);
      }
      th {
        color: var(--color-text-secondary);
        font-weight: 500;
        background: var(--color-background);
      }
      td {
        color: var(--color-text);
        font-size: 1rem;
        vertical-align: top;
      }
      ul {
        margin: 0;
        padding-left: 16px;
      }
      .status-active {
        color: #2ecc40;
        font-weight: 600;
      }
      .status-inactive {
        color: #ff7675;
        font-weight: 600;
      }
    }
  }
}

.popup-test {
  width: 70%;
  padding: 16px;
  font-size: 1.2rem;
  color: var(--color-text);
  text-align: center;
}

@media (max-width: 900px) {
  .stats-cards {
    flex-direction: column;
    gap: 16px;
    .stat-card {
      width: 100%;
      min-width: unset;
    }
  }
  .users-table-card {
    padding: 12px;
    h2 {
      font-size: 1.1rem;
    }
    .table-wrapper {
      table {
        font-size: 0.95rem;
        th,
        td {
          padding: 8px 4px;
        }
      }
    }
  }
}
</style>
