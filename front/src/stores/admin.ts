import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/assets/js/axios'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    users: [],
  }),
  getters: {},
  actions: {
    async getUsers(page: number, limit: number) {
      try {
        const response = await axios.get(`/admin/users?page=${page}`)
        this.users = response.data.users
      } catch (error) {
        console.error('Users error:', error)
      }
    },
  },
})
