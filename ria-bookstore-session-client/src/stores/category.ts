import { defineStore } from 'pinia'
import type { CategoryItem } from '@/types'
import { apiUrl } from '@/api'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categoryList: [] as CategoryItem[],
    recentCategory: "" as string,
  }),
  actions: {
    async fetchCategories() {
      const response = await fetch(`${apiUrl}/categories/`)
      const data = await response.json()
      this.categoryList = data as CategoryItem[]
    },
    getRecentCategory(recentCategory: string) {
      if (recentCategory === "") {
        this.recentCategory = this.categoryList[0].name
      }
      else {
        this.recentCategory = recentCategory
      }
    },
  }
})
