interface LeafIconProps {
  className?: string
  width?: number
  height?: number
}

export const LeafIcon = ({ className, width = 40, height = 40 }: LeafIconProps) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 5C15 10 10 20 15 30C20 25 25 15 20 5Z"
      fill="currentColor"
    />
    <path
      d="M20 5C25 10 30 20 25 30C20 25 15 15 20 5Z"
      fill="currentColor"
    />
  </svg>
)
