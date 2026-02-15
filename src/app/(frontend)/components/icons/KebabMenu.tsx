import type { CSSProperties } from 'react'

interface KebabMenuProps {
  className?: string
  width?: number
  height?: number
  style?: CSSProperties
}

export const KebabMenu = ({ className, width = 91, height = 84, style }: KebabMenuProps) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 91 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M69.6104 26.9001L9.86475 28.114L9.96632 33.113L69.712 31.899L69.6104 26.9001Z"
      fill="currentColor"
    />
    <path
      d="M74.4989 40.2939H13.0349V45.2939H74.4989V40.2939Z"
      fill="currentColor"
    />
    <path
      d="M74.4989 55.7839H13.0349V60.7839H74.4989V55.7839Z"
      fill="currentColor"
    />
  </svg>
)
