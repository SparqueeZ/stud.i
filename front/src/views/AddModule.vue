<template>
  <div class="popup-container add-module-page">
    <div class="popup-box">
      <div class="popup-header">
        <Icon name="module" class="popup-icon" />
        <h1>Ajout d’un module</h1>
      </div>
      <hr class="separator" />
      <div class="form-section">
        <p class="form-label">Titre du module</p>
        <input type="text" class="input-box" placeholder="Saisissez le titre ici" />
      </div>
      <div class="form-section">
        <p class="form-label">Ajouter une description</p>
        <textarea class="textarea-box" placeholder="Saisissez la description ici"></textarea>
      </div>
      <button class="submit-button">Ajouter le module</button>
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
  font-family: 'Poppins', sans-serif; /* Application de la police Poppins */
  color: var(--color-text); /* S'assurer que la couleur de texte est appliquée */
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
}

.popup-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.add-module-page .popup-icon {
  stroke: var(--color-text); /* Utilisation de la variable CSS pour la couleur */
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
  margin: 20px 0 20px; /* Réduction de l'espace sous la bordure */
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

.input-box {
  width: 100%;
  padding: 10px;
  border: 2px solid #232325;
  border-radius: 8px;
  background-color: #161618;
  color: #d9d9d9;
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif; /* Application de la police Poppins */
}

.input-box::placeholder {
  color: #626164;
  font-family: 'Poppins', sans-serif; /* Application de la police Poppins */
}

.textarea-box {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 2px solid #232325;
  border-radius: 8px;
  background-color: #161618;
  color: #d9d9d9;
  font-size: 0.95rem;
  resize: none;
  font-family: 'Poppins', sans-serif; /* Application de la police Poppins */
  margin-bottom: 20px; /* Ajout d'espace sous la description */
}

.textarea-box::placeholder {
  color: #626164;
  font-family: 'Poppins', sans-serif; /* Application de la police Poppins */
}

.submit-button {
  padding: 14px;
  background: #fca311;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #161618;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 8px; /* Réduction de l'espace sous le bouton jaune */
  font-family: 'Poppins', sans-serif; /* Application de la police Poppins */
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
  font-family: 'Poppins', sans-serif; /* Application de la police Poppins */
}

.back-link:hover {
  color: #d9d9d9;
}

.add-module-page .back-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  stroke: #373639;
  fill: none;
}
</style>
