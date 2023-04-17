import { defineStore } from 'pinia'
import type { CategoryItem } from '@/types'
import { apiUrl } from '@/api'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categoryList: [] as CategoryItem[],
    currentCategory: "Popular" as string,
  }),
  actions: {
    async fetchCategories() {
      const response = await fetch(`${apiUrl}/categories/`)
      const data = await response.json()
      this.categoryList = data as CategoryItem[]
    },
    getRecentCategory(recentCategory: string) {
        this.currentCategory = recentCategory
    },
    getNameFromID(categoryId: number) {
      const category = this.categoryList.find((category) => category.categoryId === categoryId)
      return category?.name
    }
  },
})
