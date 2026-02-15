import type { CSSProperties } from 'react'

interface BasketIconProps {
  className?: string
  width?: number
  height?: number
  style?: CSSProperties
}

export const BasketIcon = ({ className, width = 56, height = 79, style }: BasketIconProps) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 56 79"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M41.8319 55.4701H13.4629L9.44189 31.3411H45.8539L41.8319 55.4701ZM17.6989 50.4701H37.5949L39.9499 36.3411H15.3439L17.6989 50.4701Z"
      fill="currentColor"
    />
    <path
      d="M38.6239 33.841H33.6239C33.6239 30.546 30.9429 27.864 27.6469 27.864C24.3509 27.864 21.6699 30.545 21.6699 33.841H16.6699C16.6699 27.788 21.5939 22.864 27.6469 22.864C33.6999 22.864 38.6239 27.788 38.6239 33.841Z"
      fill="currentColor"
    />
  </svg>
)
