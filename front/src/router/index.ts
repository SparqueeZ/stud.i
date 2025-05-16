import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PasswordReset from '@/views/PasswordReset.vue'
import UserHome from '@/views/UserDashboard/Home.vue'
import Certificat from '@/views/UserDashboard/Certificat.vue'
import Formation from '@/views/UserDashboard/Formation.vue'
import HomeView from '@/views/Website/HomeView.vue'
import Parametres from '@/views/UserDashboard/Parametres.vue'
import Support from '@/views/UserDashboard/Support.vue'

import TrainerHome from '@/views/TrainerDashboard/Home.vue'
import TrainerUsers from '@/views/TrainerDashboard/Users.vue'
import TrainerFormation from '@/views/TrainerDashboard/Formations.vue'

import Course from '@/views/TrainingDashboard/Course.vue'

import ModifyPassword from '@/views/modifypassword.vue'
import Password from '@/views/password.vue'
import PageTest from '@/views/PageTest.vue'
import AddVideo from '@/views/AddVideo.vue'
import Congrats from '@/views/Congrats.vue'
import AddReview from '@/views/AddReview.vue'
import AddModule from '@/views/AddModule.vue'
import ModifyModule from '@/views/ModifyModule.vue'
import ContactSupport from '@/views/ContactSupport.vue'
import ModifyVideo from '@/views/ModifyVideo.vue'
import AddQuizz from '@/views/AddQuizz.vue'

import UserDashboard from '@/layouts/UserDashboard.vue'
import TEST from '@/views/UserDashboard/TEST.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/app',
      name: 'app',
      component: UserDashboard,
      children: [
        {
          path: '',
          name: 'accueil',
          component: UserHome,
        },
        {
          path: 'certificat',
          name: 'certificat',
          component: Certificat,
        },
        {
          path: 'formation',
          name: 'formation',
          children: [
            {
              path: '',
              name: 'formation-list',
              component: Formation,
            },
            {
              path: ':id',
              name: 'formation-detail',
              component: Course,
            },
          ],
        },
        {
          path: 'parametres',
          name: 'parametres',
          component: Parametres,
        },
        {
          path: 'support',
          name: 'support',
          component: Support,
        },
        {
          path: 'trainer',
          name: 'trainer',
          children: [
            {
              path: '',
              name: 'trainer-home',
              component: TrainerHome,
            },
            {
              path: 'formations',
              name: 'trainer-formations',
              component: TrainerFormation,
            },
            {
              path: 'utilisateurs',
              name: 'trainer-users',
              component: TrainerUsers,
            },
          ],
        },
      ],
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
    { path: '/modifypassword', name: 'ModifyPassword', component: ModifyPassword },
    {
      path: '/password',
      name: 'password',
      component: Password,
    },
    {
      path: '/page-test',
      name: 'PageTest',
      component: PageTest,
    },
    {
      path: '/add-video',
      name: 'AddVideo',
      component: AddVideo,
    },
    {
      path: '/congrats',
      name: 'Congrats',
      component: Congrats,
    },
    {
      path: '/add-review',
      name: 'AddReview',
      component: AddReview,
    },
    {
      path: '/add-module',
      name: 'AddModule',
      component: AddModule,
    },
    {
      path: '/modify-module',
      name: 'ModifyModule',
      component: ModifyModule,
    },
    {
      path: '/contact-support',
      name: 'ContactSupport',
      component: ContactSupport,
    },
    {
      path: '/modify-video',
      name: 'ModifyVideo',
      component: ModifyVideo,
    },
    {
      path: '/add-quizz',
      name: 'AddQuizz',
      component: AddQuizz,
    },
  ],
})

// Guard: bloque l'accès à /app si aucun utilisateur n'est trouvé
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // Vérifie si la route commence par /app
  if (to.path.startsWith('/app')) {
    // Si aucun utilisateur (id vide), redirige vers /login
    if (!userStore.user || !userStore.user.id) {
      return next({ name: 'login' })
    }
  }
  next()
})

export default router
