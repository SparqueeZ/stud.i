<template>
  <div class="container">
    <div class="left-image" :style="{ backgroundImage: `url(${background})` }"></div>
    <div class="right">
      <div class="login-box">
        <h1>STUD.I</h1>
        <p>Visionner , apprendre, répondre</p>

        <div class="form-group">
          <label for="email">Adresse mail</label>
          <input
            type="email"
            id="email"
            placeholder="bogoss.du974@hotmail.com"
            v-model="email"
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="MotDeP@ss3DeF0u"
            v-model="password"
          />
          <span class="toggle-password" @click="togglePassword">
            {{ showPassword ? '🙈' : '👁️' }}
          </span>
          <a href="#" class="forgot">Mot de passe oublié ?</a>
        </div>

        <button class="login-button">Connexion</button>

        <p class="signup-link">
          Vous n'avez pas de compte ?<a href="#">Inscrivez-vous.</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import backgroundImg from '@/assets/img/authentification_background.jpg'

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      background: backgroundImg,
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

html, body {
  height: 100%;
  overflow: hidden; /* 🔒 Empêche le scroll */
  background-color: #161618;
}

.container {
  display: flex;
  height: 100vh;
  background-color: #161618;
}

.left-image {
  flex: 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 24px;
  margin: 20px 0 20px 20px;
}

.right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #161618;
  padding: 20px 20px 20px 0;
}

.login-box {
  background-color: #232325;
  padding: 80px 40px;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 560px;
}

.login-box h1 {
  color: #D9D9D9;
  font-size: 2.8rem;
  font-weight: 700;
}

.login-box p {
  color: #626164;
  font-size: 1rem;
  margin-top: 10px;
}

.form-group {
  margin-top: 40px;
  position: relative;
}

.form-group label {
  color: #626164;
  font-size: 0.95rem;
  display: block;
  margin-bottom: 10px;
}

.form-group input {
  width: 100%;
  padding: 16px 48px 16px 16px;
  background: rgba(217, 217, 217, 0.03);
  border: 1px solid #232325;
  border-radius: 8px;
  color: #D9D9D9;
  font-size: 1rem;
}

.form-group input::placeholder {
  color: #626164;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #373639;
}

.forgot {
  text-align: right;
  font-size: 0.85rem;
  color: #626164;
  margin-top: 10px;
  display: block;
}

.login-button {
  background-color: #FCA311;
  color: #000;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  width: 100%;
  margin-top: 36px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.login-button:hover {
  background-color: #e29200;
}

.signup-link {
  text-align: center;
  color: #626164;
  margin-top: 28px;
  font-size: 0.95rem;
  white-space: nowrap;
}

.signup-link a {
  color: #D9D9D9;
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
}
</style>
