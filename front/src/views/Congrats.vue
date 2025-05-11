<template>
  <div class="popup-container congrats-page">
    <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>
    <div class="popup-box">
      <div class="popup-header">
        <div class="circle">
          <Icon name="trophy" class="popup-icon" />
        </div>
        <h1 class="title">Félicitations !</h1>
      </div>
      <p class="popup-text">
        Tu viens de terminer le module “Module 1 - Introduction” avec succès.
        Continue ton apprentissage en passant au module suivant !
      </p>
      <button class="continue-button">Continuer avec la prochaine vidéo</button>
      <div class="back-link" @click="$router.push('/formation')">
        <Icon name="back" class="back-icon" />
        <span>Retour à la formation</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon.vue'
import confetti from 'canvas-confetti'
import { onMounted, ref } from 'vue'

const confettiCanvas = ref(null)

onMounted(() => {
  const canvas = confettiCanvas.value
  if (canvas) {
    const myConfetti = confetti.create(canvas, { resize: true })
    myConfetti({
      particleCount: 175,
      spread: 80,
      origin: { y: 0.6 }
    })
  }
})
</script>

<style scoped lang="scss">
.popup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
}

.popup-box {
  width: 100%;
  max-width: 500px;
  padding: 50px;
  background-color: #161618;
  border: 3px solid #232325;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
}

.popup-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.circle {
  width: 120px;
  height: 120px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px; 
}

.congrats-page .popup-icon {
  stroke: #fca311;
  width: 80px;
  height: 60px;
  fill: none;
}

.title {
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
}

.popup-text {
  color: #626164;
  font-size: 0.95rem;
  margin: 20px 0;
}

.continue-button {
  padding: 14px;
  background: #fca311;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #161618;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin: 30px 0 20px;
}

.continue-button:hover {
  background-color: #b37400;
}

.back-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #626164;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #d9d9d9;
}

.congrats-page .back-icon {
  width: 20px;
  height: 20px;
  stroke: #373639;
  fill: none;
}

.confetti-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
