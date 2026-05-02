
export default function SvatantrLogo({ size = 38 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="header-logo-icon"
    >
      <rect width="64" height="64" rx="12" fill="#2e7d46" />
      <path
        d="M20 46 Q26 22 32 18 Q38 22 44 46"
        stroke="white"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="14" r="5" fill="#81c784" />
    </svg>
  )
}
