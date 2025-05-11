<template>
  <div class="test-page">
    <button @click="$router.push('/add-video')" class="test-button">Ouvrir la popup</button>
    <button @click="$router.push('/congrats')" class="test-button">Ouvrir Félicitations</button>
    <button @click="$router.push('/add-review')" class="test-button">Ouvrir Ajouter un avis</button>
    <button @click="$router.push('/add-module')" class="test-button">Ouvrir Ajouter un module</button>
    <button @click="$router.push('/modify-module')" class="popup-button">
      Modifier le module
    </button>
    <button @click="$router.push('/contact-support')" class="test-button">Ouvrir Contacter le support</button>
    <button @click="$router.push('/modify-video')" class="test-button">Ouvrir Modifier les vidéos</button>
    <AddReview v-if="showAddReview" @close="showAddReview = false" />
  </div>
</template>

<script setup>
import AddReview from './AddReview.vue'
import { ref } from 'vue'

const showAddReview = ref(false)
</script>

<style scoped>
.test-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Poppins', sans-serif; /* Application de la police Poppins */
}

.test-button {
  padding: 10px 20px;
  background-color: #fca311;
  border: none;
  border-radius: 8px;
  color: #161618;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.test-button:hover {
  background-color: #b37400;
}

.open-popup-button {
  padding: 14px;
  background: #fca311;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #161618;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.open-popup-button:hover {
  background-color: #b37400;
}

.popup-button {
  padding: 14px;
  background: #fca311;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #161618;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: 'Poppins', sans-serif;
}

.popup-button:hover {
  background-color: #b37400;
}
</style>
