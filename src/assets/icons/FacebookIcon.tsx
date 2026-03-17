import { SVGProps } from "react"

interface FacebookIconProps extends SVGProps<SVGSVGElement> {
  className?: string
  ariaLabel?: string
}

export default function FacebookIcon({
  className = "w-7 h-7",
  ariaLabel,
  ...props
}: FacebookIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      {...props}
    >
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z" />
    </svg>
  )
}
