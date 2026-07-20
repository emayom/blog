interface IconProps {
  size?: number
  className?: string
}

export function HamburgerIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}
