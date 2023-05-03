import type { BookItem } from '@/types'

// https://flaviocopes.com/how-to-format-number-as-currency-javascript/
const PriceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const BookPriceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})

export const asDollarsAndCents = function (cents: number, bookFormat: boolean) {
  if (bookFormat) {
    return BookPriceFormatter.format(Math.floor(cents / 100.0))
  } else {
    return PriceFormatter.format(cents / 100.0)
  }
}

export function getBookImageUrl(imageFileName: string) {
  return new URL(`./assets/book-images/${imageFileName}`, import.meta.url).href
}

export const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase()
  name = name.replace(/ /g, '-')
  name = name.replace(/'/g, '')
  name = name.replace(/,/g, '')
  name = name.replace(/\?/g, '')
  name = name.replace(/!/g, '')
  return `${name}.jpg`
}
