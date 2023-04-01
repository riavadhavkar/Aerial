// https://flaviocopes.com/how-to-format-number-as-currency-javascript/
const PriceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
})

export const asDollarsAndCents = function (cents: number, bookFormat: boolean) {
  if (bookFormat) {
    return PriceFormatter.format(Math.floor(cents/100))
  }
  else{
    return PriceFormatter.format(cents / 100)
  }
  
}
