export const formatPrice = (amount: number | undefined | null, currency: 'uah' | 'eur' | 'usd' = 'uah') => {
  if (amount === undefined || amount === null) return ''
  const symbols = { uah: '₴', eur: '€', usd: '$' }
  return `${amount} ${symbols[currency]}`
}
