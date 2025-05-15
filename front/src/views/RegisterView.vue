<template>
  <div class="auth-container">
    <div class="form-panel">
      <div class="register-box">
        <h1>STUD.I</h1>
        <p class="subtitle">Visionner, apprendre, répondre</p>
        <div class="form-group-row">
          <div class="form-group">
            <label for="first-name">Prénom</label>
            <div class="input-container">
              <div class="icon-box">
                <Icon name="user" class="input-icon" />
              </div>
              <div class="text-box">
                <input id="first-name" type="text" v-model="firstName" placeholder="Prénom" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="last-name">Nom de famille</label>
            <div class="input-container">
              <div class="icon-box">
                <Icon name="user" class="input-icon" />
              </div>
              <div class="text-box">
                <input id="last-name" type="text" v-model="lastName" placeholder="Nom de famille" />
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Adresse mail</label>
          <div class="input-container">
            <div class="icon-box">
              <Icon name="mail" class="input-icon" />
            </div>
            <div class="text-box">
              <input id="email" type="email" v-model="email" placeholder="Adresse mail" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <div class="input-container">
            <div class="icon-box">
              <Icon name="motdepasse" class="input-icon" />
            </div>
            <div class="text-box">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Mot de passe"
              />
            </div>
            <div class="eye-box" @click="togglePassword">
              <Icon :name="showPassword ? 'eyeclosed' : 'eyeopen'" class="toggle-password-icon" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirmation mot de passe</label>
          <div class="input-container">
            <div class="icon-box">
              <Icon name="motdepasse" class="input-icon" />
            </div>
            <div class="text-box">
              <input
                id="confirm-password"
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                placeholder="Confirmation mot de passe"
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
        <button class="register-button" type="button">Inscription</button>
        <p class="login-link">
          Vous avez déjà un compte ?
          <a href="#" @click.prevent="$router.push('/login')">Connectez-vous.</a>
        </p>
      </div>
    </div>
    <div class="image-panel" :style="{ backgroundImage: `url(${background})` }"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import background from '@/assets/img/authentification_background.jpg'
import Icon from '@/components/Icon.vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}

function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.auth-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 12px;
  background-color: #161618;
}

.image-panel {
  flex: 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  background-color: #161618;
  border-radius: 16px;
  box-sizing: border-box;
}

.form-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #161618;
}

.register-box {
  width: 100%;
  max-width: 700px;
  padding: 60px 60px;
  background-color: #161618;
  border: 3px solid #232325;
  border-radius: 16px;
}

.register-box h1 {
  color: #d9d9d9;
  font-size: 2.8rem;
  font-weight: 700;
}

.register-box .subtitle {
  color: #626164;
  font-size: 1rem;
  margin: 8px 0 24px;
}

.form-group {
  margin-bottom: 30px;
}

.form-group-row {
  display: flex;
  gap: 90px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #d9d9d9;
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

.register-button {
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

.register-button:hover {
  background-color: #b37400;
}

.login-link {
  margin-top: 24px;
  text-align: center;
  font-size: 0.95rem;
  color: #626164;
}

.login-link a {
  color: #d9d9d9;
  font-weight: 600;
  text-decoration: none;
}
</style>
