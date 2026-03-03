export const randomOffsetX = (max: number = 70) => {
  return Math.floor(Math.random() * max)
}

export const getRandomRotationClass = (
  duration: number = 300,
  hover: boolean = true,
  translate: boolean = true,
) => {
  const ROTATIONS = ['-rotate-2', 'rotate-2'] as const

  const TRANSLATES = [
    'translate-y-0',
    'translate-y-px',
    'translate-y-[2px]',
    '-translate-y-px',
    '-translate-y-[2px]',
  ] as const

  const rotationClass = ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)]

  const translateClass = translate ? TRANSLATES[Math.floor(Math.random() * TRANSLATES.length)] : ''

  return `
    block
    max-w-max
    transform
    transition-all
    duration-[${duration}ms]
    ${hover ? 'hover:rotate-0 hover:translate-y-0' : ''}
    ${rotationClass}
    ${translateClass}
  `.trim()
}

export const generateGroupedOffsetsX = (count: number, maxSpread: number = 100, maxBase: number = 300) => {
  const baseOffset = Math.floor(Math.random() * (maxBase - maxSpread))
  return Array.from({ length: count }, () => baseOffset + Math.floor(Math.random() * maxSpread))
}
