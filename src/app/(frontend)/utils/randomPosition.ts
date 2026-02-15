export const randomOffsetX = (max: number = 70) => {
  return Math.floor(Math.random() * max)
}

export const generateGroupedOffsetsX = (count: number, maxSpread: number = 100) => {
  const baseOffset = Math.floor(Math.random() * (300 - maxSpread))
  return Array.from({ length: count }, () => baseOffset + Math.floor(Math.random() * maxSpread))
}
