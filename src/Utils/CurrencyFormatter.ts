export function kFormatter(number: number) {
  return new Intl.NumberFormat('en-in', { style: 'currency', currency: 'USD' }).format(number)
}
