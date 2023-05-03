vadhavkarria:http://cs5244.cs.vt.edu:8080/RiaBookstoreOrder/:Ria Vadhavkar TESTING http://cs5244.cs.vt.edu:8080/RiaBookstoreOrder: out of 20 
=============================================================================== GRADING NOTES =============================================================================== 
We are testing with the following sections, and each section is worth 4 points. * Missing customer form values - expect a field error * Empty customer form values - expect a field error * Invalid customer form values - expect a field error * Valid customer form values - expect success message * Quantity and expiry date logic - expect appropriate errors You can earn partial points even if you fail some tests in a section. All scores will be rounded to the nearest integer for grading purposes; however to receive full points you must pass all tests. In other words, if you fail even 1 test the most you can get is 19. Dr A. 

======================================================== Tested with invalid name/Bad. Expected field error but encountered: status_code=400 and response={"reason":    "Bad Request","message":"Transactions have not been implemented yet.","fieldName":null,"error":true} (FAIL, -0.25) -------------------------------------------------------- { "cart": { "itemArray": [ { "book": { "bookId": 1002, "title": "Hanyang Diaries", "author": "Soohyun Jung, Youngeun Kim", "price": 1399, "rating": 0, "isPublic": false, "isFeatured": true, "categoryId": 1001 }, "quantity": 1 } ] }, "customerForm": { "name": "Bad", "email": "monica@email.com", "address": "123 Main St", "phone": "408 555 1212", "ccNumber": "4444333322221111", "ccExpiryMonth": 7, "ccExpiryYear": 2026 } } 

======================================================== ======================================================== Tested with invalid address/Bad. Expected field error but encountered: status_code=400 and response={"reason":"Bad Request","message":"Transactions have not been implemented yet.","fieldName":null,"error":true} (FAIL, -0.25) -------------------------------------------------------- { "cart": { "itemArray": [ { "book": { "bookId": 1002, "title": "Hanyang Diaries", "author": "Soohyun Jung, Youngeun Kim", "price": 1399, "rating": 0, "isPublic": false, "isFeatured": true, "categoryId": 1001 }, "quantity": 1 } ] }, "customerForm": { "name": "Monica", "email": "monica@email.com", "address": "Bad", "phone": "408 555 1212", "ccNumber": "4444333322221111", "ccExpiryMonth": 7, "ccExpiryYear": 2026 } } 

======================================================== ======================================================== Tested with invalid ccExpiryMonth/13. Expected field error but encountered: status_code=500 and response={"reason":"Internal Server Error","message":"order placement failed","fieldName":null,"error":true} (FAIL, -0.25) -------------------------------------------------------- { "cart": { "itemArray": [ { "book": { "bookId": 1002, "title": "Hanyang Diaries", "author": "Soohyun Jung, Youngeun Kim", "price": 1399, "rating": 0, "isPublic": false, "isFeatured": true, "categoryId": 1001 }, "quantity": 1 } ] }, "customerForm": { "name": "Monica", "email": "monica@email.com", "address": "123 Main St", "phone": "408 555 1212", "ccNumber": "4444333322221111", "ccExpiryMonth": 13, "ccExpiryYear": 2026 } } 

======================================================== Preliminary point total is 19.25, subject to rounding. Your score was rounded from 19.25 to 19 since grades must be integers. SCORE for http://cs5244.cs.vt.edu:8080/RiaBookstoreOrder: 19/20



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
      console.log('>> fetching book for category >> ' + categoryName)
      const categoryStore = useCategoryStore()

      let selectedCategoryName = categoryName

      const selectedCategory = categoryStore.categoryList?.find(
        (category) => category.name === categoryName
      )
      if (selectedCategory) {
        selectedCategoryName = selectedCategory.name
      }

      const url = apiUrl + 'categories/name/' + selectedCategoryName + '/books/'
      this.bookList = await fetch(url).then((response) => response.json())
    }
  }
})

async fetchBooks(categoryName: string) {
  const categoryStore = useCategoryStore()

  const selectedCategoryName =
    categoryStore.categoryList?.find((category) => category.name === categoryName)?.name ||
    categoryName

  const response = await fetch(`${apiUrl}/categories/name/${selectedCategoryName}/books`)
  if (!response.ok) {
    throw new Error('Failed to load the books.')
  }
  this.bookList = (await response.json()) as BookItem[]
}