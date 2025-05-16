<template>
  <div class="popup-container contact-support-page">
    <div class="popup-box">
      <div class="popup-header">
        <Icon name="support" class="popup-icon" />
        <h1>Contacter le support</h1>
      </div>
      <hr class="separator" />
      <h2 class="popup-title">Qu’est ce qu’il se passe ?</h2>
      <p class="popup-subtitle">
        Tu as une remarque, question ou un problème ? Notre équipe est là pour t'aider !<br />
        Renseigne ton message et nous te répondrons dans les plus brefs délais.
      </p>
      <div class="form-section">
        <p class="form-label">Ecris ton problème ici</p>
        <textarea class="textarea-box" placeholder="Saisissez votre message ici"></textarea>
      </div>
      <div class="form-section contact-preference">
        <p class="form-label">Tu souhaites être recontacté ?</p>
        <div class="checkbox-group">
          <label>
            <input type="radio" name="contact-preference" value="oui" v-model="contactPreference" />
            Oui
          </label>
          <label>
            <input type="radio" name="contact-preference" value="non" v-model="contactPreference" />
            Non
          </label>
        </div>
      </div>
      <div v-if="contactPreference === 'oui'" class="form-section email-input">
        <p class="form-label">Saisis ton adresse mail ici :</p>
        <div class="input-container">
          <div class="icon-box">
            <Icon name="mail" class="input-icon" style="stroke: #373639" />
          </div>
          <div class="text-box">
            <input type="email" v-model="email" placeholder="exemple@domaine.com" />
          </div>
        </div>
      </div>
      <button class="submit-button">Envoyer le message</button>
      <div class="back-link" @click="$router.push('/')">
        <Icon name="back" class="back-icon" />
        <span>Retour au dashboard</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Icon from '@/components/lib/Icon.vue'

const contactPreference = ref(null)
const email = ref('')
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
  overflow: hidden;
}

.popup-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.contact-support-page .popup-icon {
  stroke: var(--color-text);
  width: 28px;
  height: 28px;
  margin-right: 12px;
  fill: none;
}

h1 {
  color: #d9d9d9;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.separator {
  border: none;
  height: 2px;
  background-color: #232325;
  margin: 20px 0;
}

.popup-title {
  color: #d9d9d9;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  font-family: 'Poppins', sans-serif;
}

.popup-subtitle {
  color: #626164;
  font-size: 0.95rem;
  text-align: center;
  margin-bottom: 40px;
  font-family: 'Poppins', sans-serif;
}

.form-section {
  margin-bottom: 20px;
  text-align: left;
  max-width: 100%;
}

.form-label {
  color: #d9d9d9;
  font-size: 0.95rem;
  margin-bottom: 10px;
  font-family: 'Poppins', sans-serif;
}

.textarea-box {
  width: calc(100% - 24px);
  height: 100px;
  padding: 10px;
  border: 2px solid #232325;
  border-radius: 8px;
  background-color: #161618;
  color: #d9d9d9;
  font-size: 0.95rem;
  resize: none;
  font-family: 'Poppins', sans-serif;
}

.textarea-box::placeholder {
  color: #626164;
}

.contact-preference {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.checkbox-group {
  display: flex;
  gap: 20px;
}

.checkbox-group label {
  color: #d9d9d9;
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox-group input[type='radio'] {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #fca311;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.checkbox-group input[type='radio']:checked {
  background-color: #fca311;
  border-color: #b37400;
}

.checkbox-group input[type='radio']:hover {
  border-color: #b37400;
}

.email-input {
  margin-top: 20px;
}

.input-container {
  position: relative;
  max-width: 100%;
  display: flex;
  align-items: center;
  background: rgba(217, 217, 217, 0.03);
  border: 1px solid #232325;
  border-radius: 8px;
  height: 40px;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #232325;
  width: 20px;
  height: 20px;
  padding: 0 8px;
  color: inherit;
}

.text-box {
  flex: 1;
}

.text-box input {
  width: calc(100% - 24px);
  padding: 10px;
  background: transparent;
  border: none;
  color: #d9d9d9;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
}

.text-box input:focus {
  outline: none;
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
  margin-bottom: 10px;
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
  font-family: 'Poppins', sans-serif;
}

.back-link:hover {
  color: #d9d9d9;
}

.contact-support-page .back-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  stroke: #373639;
  fill: none;
}
</style>
