export default function SvatantrLogo({ size = 38 }) {
  return (
    <img
      src="/Svatantr.png"
      alt="Svatantr"
      width={size * 3}
      height={size}
      style={{ objectFit: 'contain' }}
    />
  )
}
