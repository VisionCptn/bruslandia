interface TrashIconProps {
  width?: number
  height?: number
  className?: string
}

export const TrashIcon = ({ width = 23, height = 24, className }: TrashIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 23 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M17.4659 22.7139H5.09485L2.70288 3.41992H19.3088L17.4659 22.7139Z"
      stroke="currentColor"
      strokeWidth="1.446"
      strokeMiterlimit="10"
    />
    <path
      d="M0 3.41992H22.412"
      stroke="currentColor"
      strokeWidth="1.446"
      strokeMiterlimit="10"
    />
    <path
      d="M7.54688 6.73193L8.68591 18.9399"
      stroke="currentColor"
      strokeWidth="1.446"
      strokeMiterlimit="10"
    />
    <path
      d="M13.1768 18.9398L14.3148 6.98486"
      stroke="currentColor"
      strokeWidth="1.446"
      strokeMiterlimit="10"
    />
    <path
      d="M8.3689 3.42014V0.723145H13.1769V3.42014"
      stroke="currentColor"
      strokeWidth="1.446"
      strokeMiterlimit="10"
    />
  </svg>
)
