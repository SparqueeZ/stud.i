<template>
  <div class="popup-container add-quizz-page">
    <div class="popup-box">
      <div class="popup-header">
        <Icon name="lightbulb" class="popup-icon" />
        <h1>Ajout d’un quiz</h1>
      </div>
      <hr class="separator" />
      <div class="form-section">
        <p class="form-label">Quiz existants</p>
        <div class="input-container">
          <input type="text" class="input-box" placeholder="Sélectionnez un quiz" />
          <Icon name="down" class="input-icon" />
        </div>
      </div>
      <div class="form-section">
        <p class="form-label white-text">Ajouter un Quiz</p>
        <input type="text" class="input-box" placeholder="Saisissez le titre du quiz ici" />
      </div>
      <div class="form-section">
        <div class="form-group-row">
          <div class="form-group">
            <input type="text" class="input-box" placeholder="Saisissez la réponse 1" />
          </div>
          <div class="form-group">
            <input type="text" class="input-box" placeholder="Saisissez la réponse 2" />
          </div>
        </div>
        <div class="form-group-row">
          <div class="form-group">
            <input type="text" class="input-box" placeholder="Saisissez la réponse 3" />
          </div>
          <div class="form-group">
            <input type="text" class="input-box" placeholder="Saisissez la réponse 4" />
          </div>
        </div>
      </div>
      <div class="button-section">
        <button class="delete-button">Supprimer une question</button>
        <button class="add-button">Ajouter une question</button>
      </div>
      <button class="submit-button">Ajouter le Quiz</button>
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
  overflow: hidden; /* Prevent content from exceeding the box */
}

.popup-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.add-quizz-page .popup-icon {
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

.input-container {
  position: relative;
  max-width: 100%; /* Ensure container stays within bounds */
}

.input-box {
  width: calc(100% - 24px); /* Ensure padding doesn't cause overflow */
  padding: 10px;
  border: 2px solid #232325;
  border-radius: 8px;
  background-color: #161618;
  color: #d9d9d9;
  font-size: 0.95rem;
}

.input-box::placeholder {
  color: #626164;
}

.input-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  stroke: #373639;
  width: 20px;
  height: 20px;
}

.form-group-row {
  display: flex;
  gap: 20px; /* Space between columns */
  margin-bottom: 20px; /* Add vertical spacing between rows */
}

.form-group {
  flex: 1;
}

.button-section {
  display: flex;
  justify-content: center; /* Center the buttons horizontally */
  gap: 20px; /* Add space between the buttons */
  margin: 20px 0;
  transform: translateX(-10px); /* Shift buttons slightly to the left */
}

.delete-button {
  padding: 14px;
  background: #ff4d4f;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #161618;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.delete-button:hover {
  background-color: #d9363e;
}

.add-button {
  padding: 14px;
  background: #4caf50;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #161618;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-button:hover {
  background-color: #388e3c;
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
  margin-bottom: 20px;
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

.add-quizz-page .back-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  stroke: #373639;
  fill: none;
}

.white-text {
  color: #ffffff; /* Set text color to white */
  font-size: 1rem;
  font-weight: bold;
}
</style>
