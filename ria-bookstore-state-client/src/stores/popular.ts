import { defineStore } from 'pinia'
import type { PopularItem } from '@/types'
import { apiUrl } from '@/api'

export const usePopularStore = defineStore('popular', {
  state: () => ({
    popularList: [] as PopularItem[],
    start: 0 as number,
    end: 0 as number,
    numberOfItems: 0 as number
  }),
  actions: {
    async fetchPopular() {
      const response = await fetch(`${apiUrl}/is-featured`)
      const data = await response.json()
      this.popularList = data as PopularItem[]
      this.start = 0
      this.end = this.popularList.length / 5
      this.numberOfItems = this.popularList.length / 5
    },
    forward() {
      if (this.end < this.popularList.length) {
        this.start += this.numberOfItems
        this.end += this.numberOfItems
      }
    },
    backward() {
      if (this.start > 0) {
        this.start -= this.numberOfItems
        this.end -= this.numberOfItems
      }
    }
  },
  getters: {
    getCarouselItems(state) {
      return state.popularList.slice(state.start, state.end)
    }
  }
})
