import { defineStore } from 'pinia'
import type { PopularItem } from '@/types'
import { apiUrl } from '@/api'

export const usePopularStore = defineStore('popular', {
  state: () => ({
    popularList: [] as PopularItem[]
  }),
  actions: {
    async fetchPopular() {
        const response = await fetch(`${apiUrl}/is-featured`)
        const data = await response.json()
        this.popularList = data as PopularItem[]
    }
  }
})
