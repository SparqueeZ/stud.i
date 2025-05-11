<template>
  <div class="popup-container modify-module-page">
    <div class="popup-box">
      <div class="popup-header">
        <Icon name="edit" class="popup-icon" />
        <h1>Modifier le module “1 - Introduction”</h1>
      </div>
      <hr class="separator" />
      <div class="form-section">
        <p class="form-label">Titre du module</p>
        <div class="input-container">
          <input type="text" class="input-box" placeholder="Modifier le titre ici" />
          <Icon name="edit" class="input-icon" />
        </div>
      </div>
      <div class="form-section">
        <p class="form-label">Description</p>
        <div class="textarea-container">
          <textarea class="textarea-box" placeholder="Modifier la description ici"></textarea>
          <Icon name="edit" class="textarea-icon" />
        </div>
      </div>
      <div class="action-section">
        <div class="action-box">
          <Icon name="import" class="action-icon" />
          <span class="action-text">Ajouter une vidéo</span>
        </div>
        <div class="action-box">
          <Icon name="editvideo" class="action-icon" />
          <span class="action-text">Modifier une vidéo</span>
        </div>
      </div>
      <div class="button-section">
        <div class="button-wrapper">
          <button class="submit-button">Modifier le module</button>
          <button class="delete-button" @click="deleteModule">Supprimer le module</button>
        </div>
      </div>
      <div class="back-link" @click="$router.push('/formation')">
        <Icon name="back" class="back-icon" />
        <span>Retour à la formation</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon.vue'
const deleteModule = () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce module ?')) {
    alert('Module supprimé avec succès.');
  }
};
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
}

.popup-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.modify-module-page .popup-icon {
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

.form-section {
  margin-bottom: 20px;
  text-align: left;
}

.form-label {
  color: #626164;
  font-size: 0.95rem;
  margin-bottom: 10px;
}

.input-container,
.textarea-container {
  position: relative;
}

.input-box,
.textarea-box {
  width: 100%;
  padding: 10px;
  border: 2px solid #232325;
  border-radius: 8px;
  background-color: #161618;
  color: #d9d9d9;
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
}

.input-box::placeholder,
.textarea-box::placeholder {
  color: #626164;
}

.input-icon,
.textarea-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  stroke: #373639;
  width: 20px;
  height: 20px;
}

.textarea-box {
  height: 100px;
  resize: none;
}

.action-section {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 50px;
}

.action-box {
  width: 48%;
  height: 120px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.action-icon {
  stroke: #373639;
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
  transition: stroke 0.2s ease, scale 0.3s ease;
}

.action-icon:hover {
  stroke: #ffffff;
}

.action-text {
  color: #ffffff;
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin-top: 8px;
}

.button-section {
  display: flex;
  justify-content: center; 
  align-items: center;
  margin-bottom: 30px;
}

.button-wrapper {
  display: flex;
  gap: 20px; 
  margin-left: 20px; 
}

.submit-button,
.delete-button {
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: 'Poppins', sans-serif;
}

.submit-button {
  background: #fca311;
  color: #161618;
}

.submit-button:hover {
  background-color: #b37400;
}

.delete-button {
  background: #ff4d4f;
  color: #161618;
}

.delete-button:hover {
  background-color: #d9363e;
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

.modify-module-page .back-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  stroke: #373639;
  fill: none;
}

.textarea-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  stroke: #373639;
  width: 20px;
  height: 20px;
}
</style>
