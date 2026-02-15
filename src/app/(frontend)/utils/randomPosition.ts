export const randomOffsetX = (max: number = 70) => {
  return Math.floor(Math.random() * max)
}

export const getRandomRotationClass = (min: number = -4, max: number = 4, duration: number = 500) => {
  const position = Math.random() * (max - min) + min;
  const classBase = `transition-transform duration-${duration} hover:rotate-0`;
  const rotationClass = position > 0 ? `rotate-${Math.ceil(position)}` : `-rotate-${Math.ceil(-position)}`;

  return classBase + ' ' + rotationClass;
}

export const generateGroupedOffsetsX = (count: number, maxSpread: number = 100) => {
  const baseOffset = Math.floor(Math.random() * (300 - maxSpread))
  return Array.from({ length: count }, () => baseOffset + Math.floor(Math.random() * maxSpread))
}
