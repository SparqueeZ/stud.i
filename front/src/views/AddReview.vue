<template>
  <div class="popup-container add-review-page">
    <div class="popup-box">
      <div class="popup-header">
        <Icon name="review" class="popup-icon" />
        <h1>Ajouter un avis</h1>
      </div>
      <hr class="separator" />
      <p class="description">
        Ton retour compte ! Dis-nous ce que tu as pensé de ce module pour aider les futurs apprenants et faire évoluer la formation.
      </p>
      <div class="spacer"></div>
      <div class="rating-section">
        <p class="rating-text">Sélectionne ta note</p>
        <div class="stars">
          <Icon name="star" v-for="n in 5" :key="n" class="star-icon" @mouseover="hoverStar(n)" @mouseleave="hoverStar(0)" @click="selectStar(n)" :class="{ active: n <= selectedStar || n <= hoveredStar }" />
        </div>
      </div>
      <textarea class="message-box" placeholder="Ecris ton message ici"></textarea>
      <button class="submit-button">Envoyez</button>
      <div class="back-link" @click="$emit('close')">
        <Icon name="back" class="back-icon" />
        <span>Retour à la formation</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon.vue'
import { ref } from 'vue'

const selectedStar = ref(0)
const hoveredStar = ref(0)
let hoverTimeout = null

const hoverStar = (n) => {
  clearTimeout(hoverTimeout)
  hoverTimeout = setTimeout(() => {
    hoveredStar.value = n
  }, 50)
}

const selectStar = (n) => {
  if (selectedStar.value === n) {
    selectedStar.value = 0
  } else {
    selectedStar.value = n
  }
}
</script>

<style scoped lang="scss">
.popup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  font-family: 'Poppins', sans-serif;
}

.popup-box {
  width: 100%;
  max-width: 600px; 
  padding: 50px; 
  background-color: #161618;
  border: 3px solid #232325;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  font-family: 'Poppins', sans-serif;
  overflow: hidden; 
}

.popup-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.add-review-page .popup-icon {
  stroke: var(--color-text);
  width: 28px;
  height: 28px;
  margin-right: 12px;
  fill: none;
  display: flex;
  align-items: center;
}

h1 {
  color: #d9d9d9;
  font-size: 1.5rem;
  font-weight: 700;
}

.separator {
  border: none;
  height: 2px;
  background-color: #232325;
  margin: 20px 0;
}

.description {
  color: #626164;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.spacer {
  margin-top: 40px;
}

.rating-section {
  text-align: left;
  margin-bottom: 20px;
}

.rating-text {
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 10px;
  font-weight: bold;
}

.stars {
  display: flex;
  gap: 10px;
}

.star-icon {
  stroke: #626164;
  fill: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: stroke 0.2s ease, fill 0.2s ease;
}

.star-icon.active {
  stroke: #fca311;
  fill: #fca311;
}

.message-box {
  width: calc(100% - 24px); 
  height: 100px;
  padding: 10px;
  border: 2px solid #232325;
  border-radius: 8px;
  background-color: #161618;
  color: #d9d9d9;
  font-size: 0.95rem;
  margin-bottom: 50px;
  resize: none; 
  font-family: 'Poppins', sans-serif;
}

.message-box::placeholder {
  color: #626164;
  font-family: 'Poppins', sans-serif; 
}

.submit-button {
  padding: 14px 20px; 
  background: #fca311;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #161618;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 1px;
  font-family: 'Poppins', sans-serif; 
}

.submit-button:hover {
  background-color: #b37400;
}

.back-link {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  color: #626164;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #d9d9d9;
}

.add-review-page .back-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  stroke: #373639;
  fill: none;
}

.upload-icon svg,
.popup-icon svg {
  width: 100%;
  height: 100%;
  stroke: inherit;
  fill: inherit;
}
</style>