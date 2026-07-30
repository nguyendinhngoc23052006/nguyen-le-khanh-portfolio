export default function Vignette() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background:
          'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(10,20,15,0.35) 100%)',
      }}
    />
  )
}
