<template>
  <div class="password-container">
    <div class="password-box">
      <h1>Modifier votre mot de passe</h1>
      <p class="subtitle">
        Modifie ton mot de passe. Pour ta sécurité, choisis un mot de passe solide.
      </p>
      <div class="form-group">
        <label for="new-password">Nouveau mot de passe</label>
        <div class="input-container">
          <div class="icon-box">
            <Icon name="motdepasse" class="input-icon" />
          </div>
          <div class="text-box">
            <input
              id="new-password"
              :type="showNewPassword ? 'text' : 'password'"
              v-model="newPassword"
              placeholder="Nouveau mot de passe"
            />
          </div>
          <div class="eye-box" @click="toggleNewPassword">
            <Icon :name="showNewPassword ? 'eyeclosed' : 'eyeopen'" class="toggle-password-icon" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirmation du mot de passe</label>
        <div class="input-container">
          <div class="icon-box">
            <Icon name="motdepasse" class="input-icon" />
          </div>
          <div class="text-box">
            <input
              id="confirm-password"
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              placeholder="Confirmation du mot de passe"
            />
          </div>
          <div class="eye-box" @click="toggleConfirmPassword">
            <Icon
              :name="showConfirmPassword ? 'eyeclosed' : 'eyeopen'"
              class="toggle-password-icon"
            />
          </div>
        </div>
      </div>
      <button class="continue-button" type="button">Changer le mot de passe</button>
      <div class="back-link" @click="$router.push('/login')">
        <Icon name="back" class="back-icon" />
        <span>Retour à la connexion</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Icon from '@/components/lib/Icon.vue'

const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

function toggleNewPassword() {
  showNewPassword.value = !showNewPassword.value
}

function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 40px;
  background: url('@/assets/img/authentification_background.jpg') no-repeat center center fixed;
  background-size: cover;
  box-sizing: border-box;
}

.password-box {
  width: 100%;
  max-width: 600px;
  padding: 40px 60px;
  background-color: #161618;
  border: 3px solid #232325;
  border-radius: 16px;
  text-align: center;
  margin: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

h1 {
  color: #d9d9d9;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.subtitle {
  color: #626164;
  font-size: 0.95rem;
  margin-bottom: 64px;
}

.form-group {
  margin-bottom: 40px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  color: #626164;
  font-size: 0.85rem;
  text-align: left;
  padding-left: 4px;
}

.input-container {
  display: flex;
  align-items: center;
  background: rgba(217, 217, 217, 0.03);
  border: 1px solid #232325;
  border-radius: 8px;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #232325;
  padding: 0 12px;
  color: #232325;
}

.text-box {
  flex: 1;
}

.text-box input {
  width: 100%;
  padding: 14px 16px;
  background: transparent;
  border: none;
  color: #d9d9d9;
  font-size: 1rem;
}

.text-box input:focus {
  outline: none;
}

.eye-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  cursor: pointer;
  color: #232325;
}

.toggle-password-icon {
  width: 24px;
  height: 24px;
  stroke: #d9d9d9;
  transition: stroke 0.2s ease;
}

.eye-box:hover .toggle-password-icon {
  stroke: #fca311;
}

.continue-button {
  margin-top: 20px;
  width: 100%;
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

.continue-button:hover {
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
  stroke: #626164;
}
</style>
