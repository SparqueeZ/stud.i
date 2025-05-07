import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: '',
      firstname: 'Baptiste',
      lastname: 'DIJOUX',
      email: 'baptiste.dijouxn20@gmail.com',
      role: 'administrator' as 'administrator' | 'trainer' | 'user' | 'guest',
    },
  }),
  getters: {},
  actions: {},
})
