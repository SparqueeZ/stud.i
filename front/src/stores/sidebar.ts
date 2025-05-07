import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpen: true,
  }),
  getters: {},
  actions: {
    toggleSidebar() {
      console.log('toggleSidebar')
      this.isOpen = !this.isOpen
    },
    openSidebar() {
      this.isOpen = true
    },
    closeSidebar() {
      this.isOpen = false
    },
  },
})
