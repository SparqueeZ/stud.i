import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/login.vue';
import Password from '@/views/password.vue';
import Register from '@/views/register.vue';
import ModifyPassword from '@/views/modifypassword.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/password', name: 'Password', component: Password },
  { path: '/register', name: 'Register', component: Register },
  { path: '/modifypassword', name: 'ModifyPassword', component: ModifyPassword },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});