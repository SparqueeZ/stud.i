import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/assets/js/axios'

export const useCourseStore = defineStore('course', {
  state: () => ({
    course: {},
  }),
  getters: {},
  actions: {
    setCourses(courses: any) {
      this.course = courses
    },
  },
})
