import { defineStore } from 'pinia'
import type { BookItem } from '@/types'
import { apiUrl } from '@/api'
import { useCategoryStore } from '@/stores/category'

export const useBookStore = defineStore('book', {
  state: () => ({
    bookList: [] as BookItem[]
  }),
  actions: {
    async fetchBooks(categoryName: string) {
      console.log(">> fetching book for category >> " + categoryName)
      const categoryStore = useCategoryStore()

      const selectedCategoryName =
        categoryStore.categoryList?.find((category) => category.name === categoryName)?.name ||
        categoryName

      this.bookList = await fetch(`${apiUrl}/categories/name/${selectedCategoryName}/books`).then(
        (response) => response.json()
      )
    }
  }
})
