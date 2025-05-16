import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/assets/js/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: '',
      firstname: 'Baptiste',
      lastname: 'DIJOUX',
      email: 'baptiste.dijouxn20@gmail.com',
      role: 'administrator' as 'administrator' | 'trainer' | 'user' | 'guest',
    },
    loading: false,
  }),
  getters: {},
  actions: {
    async login(email: string, password: string) {
      this.loading = true
      try {
        const response = await axios.post('/auth/login', {
          email,
          password,
        })
        this.user = response.data.user
        console.log('Login response:', response)
        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      } finally {
        this.loading = false
      }
    },
    async register(firstname: string, lastname: string, email: string, password: string) {
      console.log('Register...')
      try {
        const response = await axios.post('/auth/register', {
          firstname,
          lastname,
          email,
          password,
        })
        console.log('Register response:', response)
      } catch (error) {
      } finally {
        console.log('Register finished')
      }
    },
  },
})
