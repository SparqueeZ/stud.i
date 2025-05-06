import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PasswordReset from '@/views/PasswordReset.vue'
import UserHome from '@/views/UserDashboard/Home.vue'
import Certificat from '@/views/UserDashboard/Certificat.vue'
import Formation from '@/views/UserDashboard/Formation.vue'

import TrainerHome from '@/views/TrainerDashboard/Home.vue'
import TrainerUsers from '@/views/TrainerDashboard/Users.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: UserHome,
    },
    {
      path: '/formation',
      name: 'formation',
      component: Formation,
    },
    {
      path: '/certificat',
      name: 'certificat',
      component: Certificat,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: PasswordReset,
    },
    {
      path: '/trainer',
      name: 'Tableau de bord',
      component: TrainerHome,
    },
    {
      path: '/trainer/utilisateurs',
      name: 'Utilisateurs',
      component: TrainerUsers,
    },
  ],
})

export default router
