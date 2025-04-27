import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/login.vue';
import Password from '@/views/password.vue';
import Register from '@/views/register.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/password', name: 'Password', component: Password },
  { path: '/register', name: 'Register', component: Register },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});