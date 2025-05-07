<template>
  <div class="popup-container">
    <div class="popup-box">
      <div class="popup-header">
        <Icon name="video" class="popup-icon" />
        <h1>Importer une vidéo</h1>
      </div>
      <hr class="separator" />
      <div class="upload-area">
        <div class="upload-circle">
          <Icon name="import" class="upload-icon" />
        </div>
        <p class="upload-text">
          Glissez-déposez les fichiers vidéo que vous souhaitez ajouter au module.
        </p>
        <button class="upload-button">Sélectionnez des fichiers</button>
      </div>
      <div class="back-link" @click="$router.push('/')">
        <Icon name="back" class="back-icon" />
        <span>Retour au dashboard</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon.vue'
</script>

<style scoped lang="scss">
.popup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
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
}

.popup-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.popup-icon {
  stroke: var(--color-text);
  width: 24px;
  height: 24px;
  margin-right: 12px;
  fill: none;
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

.upload-area {
  text-align: center;
}

.upload-circle {
  width: 200px;
  height: 200px;
  margin: 0 auto 45px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-icon {
  stroke: var(--color-text-tertiary);
  fill: none;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  transition: stroke 0.2s ease, scale 0.3s ease;
  &:hover {
    scale: 1.1;
  }
}

.upload-icon:hover {
  stroke: #ffffff;
}

.upload-text {
  color: #626164;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.upload-button {
  padding: 14px;
  background: #fca311;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #161618;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 30px;
}

.upload-button:hover {
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

.back-icon {
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
