export const randomOffsetX = (max: number = 70) => {
  return Math.floor(Math.random() * max)
}

export const getRandomRotationClass = (
    min: number = -8, 
    max: number = 8, 
    duration: number = 300,
    hover: boolean = true,
    translate: boolean = true
) => {
  const rotation = Math.random() * (max - min) + min;
  let translateClass = '';

  if (translate) {
    const TRANSLATE_Y_MAP = {
      0: "0",
      1: "px",
      2: "0.5",
      3: "1",
      4: "2",
      5: "3",
      // 6: "1/2",
    } as const;
    const direction = Math.round(Math.random()); // 0 ^ 1
    const magnitude = Math.floor(Math.random() * 6) as 0|1|2|3|4|5;

    const sign = direction === 0 ? "-" : "";
    const val = TRANSLATE_Y_MAP[magnitude];

    translateClass =  `${sign}translate-y-${val}`;
  }

  const classBase = `block max-w-max transition-all duration-[${duration}ms] ${hover ? 'hover:rotate-0' : ''}`;
  const rotationClass = rotation > 0 ? `rotate-${Math.ceil(rotation)}` : `-rotate-${Math.ceil(-rotation)}`;

  return `${classBase} ${rotationClass} ${translateClass}`;
}

export const generateGroupedOffsetsX = (count: number, maxSpread: number = 100) => {
  const baseOffset = Math.floor(Math.random() * (300 - maxSpread))
  return Array.from({ length: count }, () => baseOffset + Math.floor(Math.random() * maxSpread))
}
