import type { CSSProperties } from 'react'

interface SearchIconProps {
  className?: string
  width?: number
  height?: number
  style?: CSSProperties
}

export const SearchIcon = ({ className, width = 55, height = 76, style }: SearchIconProps) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 55 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M28.9511 44.898C21.3601 44.898 15.1851 38.723 15.1851 31.132C15.1851 23.541 21.3601 17.366 28.9511 17.366C36.5421 17.366 42.7181 23.541 42.7181 31.132C42.7181 38.723 36.5421 44.898 28.9511 44.898ZM28.9511 22.367C24.1181 22.367 20.1851 26.3 20.1851 31.133C20.1851 35.966 24.1181 39.899 28.9511 39.899C33.7841 39.899 37.7181 35.967 37.7181 31.133C37.7181 26.299 33.7851 22.367 28.9511 22.367Z"
      fill="currentColor"
    />
    <path
      d="M38.9548 36.9737L35.4819 40.5708L43.6078 48.416L47.0807 44.8188L38.9548 36.9737Z"
      fill="currentColor"
    />
  </svg>
)
