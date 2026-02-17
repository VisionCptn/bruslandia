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
      d="M34.9861 36.7639C42.712 36.7639 48.9751 30.5008 48.9751 22.7749C48.9751 15.049 42.712 8.78589 34.9861 8.78589C27.2602 8.78589 20.9971 15.049 20.9971 22.7749C20.9971 30.5008 27.2602 36.7639 34.9861 36.7639Z"
      fill="#DC5231"
    />
    <path
      d="M36.8671 48.0789H8.49707L4.47607 23.95H40.8881L36.8671 48.0789ZM12.7341 43.0789H32.6301L34.9851 28.95H10.3781L12.7331 43.0789H12.7341Z"
      fill="currentColor"
    />
    <path
      d="M33.6591 26.4499H28.6591C28.6591 23.1549 25.9781 20.4729 22.6821 20.4729C19.3861 20.4729 16.7051 23.1539 16.7051 26.4499H11.7051C11.7051 20.3969 16.6291 15.4729 22.6821 15.4729C28.7351 15.4729 33.6591 20.3969 33.6591 26.4499Z"
      fill="currentColor"
    />
  </svg>
)
