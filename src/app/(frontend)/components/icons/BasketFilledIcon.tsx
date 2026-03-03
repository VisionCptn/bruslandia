import type { CSSProperties } from 'react'

interface BasketFilledIconProps {
  className?: string
  width?: number
  height?: number
  style?: CSSProperties
}

export const BasketFilledIcon = ({
  className,
  width = 56,
  height = 59,
  style,
}: BasketFilledIconProps) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 56 59"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M39.51 33.978C47.2359 33.978 53.499 27.7149 53.499 19.989C53.499 12.2631 47.2359 6 39.51 6C31.7841 6 25.521 12.2631 25.521 19.989C25.521 27.7149 31.7841 33.978 39.51 33.978Z"
      fill="#DC5231"
    />
    <path
      d="M41.391 45.2931H13.021L9 21.1641H45.412L41.391 45.2931ZM17.258 40.2931H37.154L39.509 26.1641H14.902L17.257 40.2931H17.258Z"
      fill="currentColor"
    />
    <path
      d="M38.183 23.664H33.183C33.183 20.369 30.502 17.687 27.206 17.687C23.91 17.687 21.229 20.368 21.229 23.664H16.229C16.229 17.611 21.153 12.687 27.206 12.687C33.259 12.687 38.183 17.611 38.183 23.664Z"
      fill="currentColor"
    />
  </svg>
)
